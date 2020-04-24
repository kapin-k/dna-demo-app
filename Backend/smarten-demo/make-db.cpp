#include <fstream>
#include <iostream>
#include <string>
#include <vector>


int main(int argc, char* argv[]) {
    std::vector<std::string> DB_name;
    std::vector<std::vector<float>> DB_sig;

    for (int i = 1; i < argc; ++i) {
        std::cout << "reading " << argv[i] << "..." << std::endl;

        std::ifstream f(argv[i]);

        std::string s;
        std::getline(f, s);

        std::vector<float> v;
        while (!f.eof()) {
            float x;
            f >> x;
            v.push_back(x);
        }

        DB_name.push_back(s);
        DB_sig.push_back(v);
    }

    int n = DB_name.size();

    std::ofstream of("db.names");
    of << n << "\n";
    for (int i = 0; i < n; ++i) of << DB_sig[i].size() << " " << DB_name[i] << "\n";
    of.close();

    of.open("db.sigs", std::ios::binary);
    for (int i = 0; i < n; ++i) of.write((const char*)DB_sig[i].data(), DB_sig[i].size() * sizeof(float));
    of.close();

    return 0;
} // main
