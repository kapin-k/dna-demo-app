#include <algorithm>
#include <chrono>
#include <cmath>
#include <fstream>
#include <iostream>
#include <string>
#include <vector>


template <typename Float = double, typename Vector>
inline Float dtw(const Vector& v, int first, int n, const Vector& v2) {
    const Float* v1 = v.data() + first;
    int m = v2.size();

    n++;
    m++;

    std::vector<Float> D(2 * m, std::numeric_limits<Float>::infinity());

    D[0] = 0;

    Float* Dp = D.data();
    Float* Dc = Dp + m;

    for (int i = 1; i < n; ++i) {
        Dc[0] = std::numeric_limits<Float>::infinity();
        for (int j = 1; j < m; ++j) {
            Float d = std::min({ Dc[j - 1],  Dp[j], Dp[j - 1]});
            Float t = (v1[i - 1] - v2[j - 1]);
            Dc[j] = d + (t * t);
        }
        std::swap(Dp, Dc);
    } // for i

    return std::sqrt(Dp[m - 1]);
} // dtw


int main(int argc, char* argv[]) {
    int n = 0;

    std::vector<std::string> DB_name;
    std::vector<std::vector<float>> DB_sig;

    std::ifstream f("db.names");

    f >> n;

    DB_name.resize(n);
    DB_sig.resize(n);

    for (int i = 0; i < n; ++i) {
        int l = 0;

        f >> l;
        DB_sig[i].resize(l);

        std::getline(f, DB_name[i]);
    }

    f.close();


    f.open("db.sigs", std::ios::binary);

    for (int i = 0; i < n; ++i) {
        f.read((char*)DB_sig[i].data(), DB_sig[i].size() * sizeof(float));
    }

    f.close();


    std::vector<float> q(argc - 1);
    for (int i = 1; i < argc; ++i) q[i - 1] = std::stof(argv[i]);

    std::vector<float> score(n);
    std::vector<float> pos(n);
    std::vector<float> time(n);

    int d = q.size() >> 1;

    // we know that the range is roughly [-2,2]
    float norm = std::sqrt(16 * q.size());

    #pragma omp parallel for
    for (int i = 0; i < n; ++i) {
        auto t0 = std::chrono::steady_clock::now();
        score[i] = 999999;
        for (int j = 0; j < DB_sig[i].size() - d; j += d) {
            float res = dtw<float>(DB_sig[i], j, q.size(), q);
            if (res < score[i]) {
                score[i] = res;
                pos[i] = j;
            }
        }
        auto t1 = std::chrono::steady_clock::now();
        time[i] = std::chrono::duration<double>(t1 - t0).count();
    }

    // print hits
    for (int i = 0; i < n; ++i) {
        std::cout << "Name\t" << DB_name[i] << "\n";
        std::cout << "Read\t";
        for (int j = 0; j < q.size(); ++j) std::cout << DB_sig[i][pos[i] + j] << " ";
        std::cout << "\n";
        std::cout << "Confidence\t" << (1.0 - (score[i] / norm)) << "\n";
        std::cout << "Time\t" << time[i] << "\n";
        std::cout << "%\n";
    }

    return 0;
} // main
