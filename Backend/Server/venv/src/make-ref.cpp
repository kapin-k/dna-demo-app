#include <fstream>
#include <iostream>
#include <string>
#include <vector>

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


    std::cout << "[";
    for (int i = 0; i < n; ++i) {
        std::cout << "{";
        std::cout << "\'Name\': ";
        std::cout << "\'" << DB_name[i] << "\', ";
        std::cout << "\'Confidence\': 1.0, ";
        std::cout << "\'Time\': 0.0, ";
        std::cout << "\'Read\': [";
        for (int j = 0; j < 1999; ++j) {
            std::cout << DB_sig[i][j] << ", ";
        }
        std::cout << DB_sig[i][2000] << "]";
        std::cout << "}";
        if (i < n - 1) std::cout << ", ";
    }
    std::cout << "]";

    return 0;
} // main
