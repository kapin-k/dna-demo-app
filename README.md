# dna-demo-app

**Description:**
- This project is about developing an interactive Android/iOS app which takes a scribble as an input from the user and returns a list of organisms with DNA sequence that closely matches the input scribble. The app is developed as a powerful, interactive tool to demo the newly developed DNA sequencer device to the public in a fun and interesting manner.

## DOCUMENTATION

### PREREQUISITES
-------------
- Node
    - Installs Node.js and npm using Homebrew on macOS

    ```bash
    brew install node
    ```

- Watchman
    - Watchman exists to watch files and record when they change. It can also trigger actions (such as rebuilding assets) when matching files change.

    ```bash
    brew install watchman
    ```

- Cocopods
    - CocoaPods is an application level dependency manager for the Objective-C/Swift, that provides a standard format for managing external libraries.

    ```bash
    sudo gem install cocoapods
    ```
- Make sure both Node.js and npm(node package manager) is installed correctly. The two commands below should return a version number as output.

    ```bash
    node --version
    ```

    ```bash
    npm --version
    ```

### BACK END (DEPRICATED - SEE BELOW FOR LATEST INSTRUCTIONS ON BACKEND)
-------------

- The back end is made of a proxy server which calls the smarten-demo server to analyze input given by the user. The proxy-server runs on Flask api from python3. 

- The backend is made of two components:
    1. `smarten-demo-srv.py`, used for analyzing and returning search results 
    2. `proxy-server.py`, the reverse-proxy used between the app and server. 

- It is recommended that the `smarten-demo-srv.py` and the `proxy-server.py` files be in the same folder. 

1. **Setting up Smarten-Demo app server**

- `smarten-demo-srv.py` must be configured such that `EXEC` variable points to the location of `db-search`. It is recommeded that `db-search` resides in the same directory as the database files and `smarten-demo-srv.py` itself.

- Navigate to '/Backend/Server/venv/src' and execute the following command:

    ```bash
        make
    ```

2. **Setting up proxy-server**

- Installing Flask API, navigate to '/Backend/Server/venv', then execute this command:
    
    ```bash
    pip3 install flask
    ```

3. **Making changes to proxy-server to connect with DNA-DEMO app**

- The proxy-server is currently configured in such a way that when it is launched it takes the IP address of the host it is running on and accepts connections on port `5000` by default. 

- If you wish to make changes to the IP or/and port number, open `proxy-server.py` file in directory '/Backend/Server/venv/src' : 
    
      For changing IP and port number : 
        
        Line No: 6 Change  `host = 'IP Address'`
        Line No: 7 Change  `port_no = <Port no>`
        
        'IP Address' => the IP address at which the server should accept incoming requests and connections
        <Port_No>    => Port number on which you which you want the proxy-server accepting the connections

4. **Starting the proxy-server**

- Navigate to '/Backend/Server/venv/src' and execute: 

    ```bash
    python3 proxy-server.py
    ```

- When you run the proxy-server, you get the following message if the proxy-server is running successfully: 

    > Serving Flask app "proxy-server" (lazy loading)
    > Environment: production
        WARNING: This is a development server. Do not use it in a production deployment.
        Use a production WSGI server instead.
    > Debug mode: off
    > Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
    
- If you have made changes to the IP address and port number, then last message will be as follows
        `* Running on http://'IP address':<Port_no>/ (Press CTRL+C to quit)`
        where 'IP address' is the IP address you specified before on which server accepts the request and <Port_no> is the   port number you specified on which the server handles connections. 
   
- If you have not made any changes then:

    - Open terminal:
        - `ipconfig` for windows machine
        - `ifconfig` for linux macine
      this to obtain the IP address of the host machine.

- **IMPORTANT:**

    - Know the IP address and Port number on which the server is currently running as it will be required in the following steps if you have made changes to them. 

    - If no changes has been made then we can obtain the IP address of the host following the steps mentioned above and the port number is by default `5000`.   
        
5. **Connecting the front end app with backend proxy-server**

- Once we have the backend proxy server up and running, we will need to connect the DNA Demo app with the back-end. 
- Currently the IP address of the proxy-server is configured as localhost in the DNA-Demo app, this has to be changed before we import the app on to a device without which the app will fail to connect to the proxy-server.
- We know the IP address and the port number on which our proxy-server is listening to requests on. 

- To connect nagivate to `'dna-demo-app/dnademo/Components'` 
    - Open `DrawingBoard.js`
        
        `* Line No: 22 const serv = 'http://127.0.0.1:5000'; //Configure with the IP Address of Proxy Server` 
           
    - change the `const serv = 'http://127.0.0.1:5000'` to: 
        - `const serv = 'http://<IP address>:5000'`, if you have not made any changes to IP and Port number in the proxy server, the `<IP address>` is the IP of the host machine you obtained by running the command `ipconfig` or `ifconfig`.
        - `const serv = 'http://<IP address>:<Port_No>'`, if you have made changes to IP and Port number in the proxy server, the `<IP address>` is the IP you specifed for the server in `proxy-server.py` and the `<Port_No>` is the port number specifed for the server to listen for connections and request in the `proxy-server.py` file. 

- After this we can proceed to the next steps. 

 ### BACK END (UPDATED)
-------------

**The server is currently runnning on AWS instance**  _Contact developers for credentials_

- **Follow the below steps to make the application run on custom server:**

1. After cloning this project, move to directory '/dnademo/Components' and do the following:

    * Open 'DrawingBoard.js' file
    * Go to Line 27: Where you may see an URL for the Server (http://smarten-env.eba-9hfjufww.us-east-2.elasticbeanstalk.com)
    * Change the URL to the URL of the desired Server

2. Navigate to directory '/dnademo/ios' and perform the following steps:

    * i) Open 'dnademo.xcworkspace' using your Xcode
    * ii) In the project navigator, expand the 'dnademo' project. You will now see a list of folders. Expand the folder 'dnademo', within which you will find a file called Info.plist.
    * iii) Right click on 'Info.plist' --> 'Open As' --> 'Source Code'.
    * iv) In Line 35, you may find the following - <key>smarten-env.eba-9hfjufww.us-east-2.elasticbeanstalk.com</key>
    * Replace the existing domain name with the domain name of the desired server. (Dont include IP address or port number) Eg: <key>github.com</key>

**Happy Searching! The application will now be connceted to the desired server. :)**


### BUILD AND DEPLOYMENT
-------------

1. **To build complete 'dnademo' react native package**

    - Step 1: Clone this repository from GitHub. Link: [dna-demo-app repository](https://github.com/kapin-k/dna-demo-app)
        - Move to the desired directory in your file system and use this command

            ```bash
                git clone https://github.com/kapin-k/dna-demo-app.git
            ```

    - Step 2: Move to folder 'dnademo' inside cloned repository and execute:
    **This step has to be repeated everytime changes are made to the formatting in the frontend**

        - Execute command below to install all the dependencies needed for building the react native application

        ```bash
        npm install --save
        npm build
        ```

    - Step 3: Go to '/ios' folder inside '/dnademo'
        - Execute command below to install all the dependencies needed for deploying on an iOS device

        ```bash
        pod install 
        ```

2. **Testing application on virtual simulator (OPTIONAL)**

    - Step 1: Go to '/dnademo' folder inside cloned repository
    - Step 2: Run command below to open console log for your simulator

        - IOS:

            ```bash
            npm start
            ```

            OR

            ```bash
            npx react-native run-ios
            ```

            * To specify target device simulator

                > Go to 'Xcode' menu > Select 'Preferences' > 'Location' section > Add your Xcode version to the 'Command Line Tools'. Continue executing commands below in the terminal.

                List all available simulator:

                ```bash
                xcrun simctl list devices
                ```

                Select a device from list:

                ```bash
                npm react-native run-ios --simulator="iPad Pro (12.9-inch) (3rd generation)"
                ```

        - ANDROID: (Needs Android Studio with JDK path set to respective environment variable)

            ```bash
            react-native run-android
            ```
        *You will now see a Metro Bundler console and a simulator ruuning. Wait for it to load completely. Once it is done loading, close the simulator.*

    - Step 3: Go to the 'ios' folder
    - Step 4: Open 'dnademo.xcworkspace' using your Xcode
    - Step 5: Click on the run button on the top-left corner of the screen

        -> Choose target simulator by clicking on available devices dropdown option near your project name. (next to the run button)
            (or) Xcode Menu -- Product -- Destination -- *choose from available device*

3. **Deploying on a physical device**

    - Step 1: Move to '/dnademo/ios/' directory inside the cloned repository
        > Open 'dnademo.xcworkspace' using your Xcode
    - Step 2: Code Signing / Requesting your certificates
        - From your Xcode, go to the 'Xcode' menu and click on 'Preferences'
            - Navigate to the 'Accounts' tab
            - Click on the '+' button on the bottom left corner of the Accounts panel to add your Apple account
                > Fill in your Apple iOS account credentials
            - Select the account you just added
                > Click on 'Manage Certificates' > 
                > Click the “+” icon below the certificates pane, and request a new iOS Development Certificate (Apple Development Certificate).
    - Step 3: Now, connect your device to the computer
    - Step 4: Go back to your Xcode's main screen and select 'dnademo' from the project navigator in Xcode
    - Step 5: To the right of the project navigator pane, you will now see a list with title 'TARGETS' with 4 options, namely: dnademo, dnademoTests, dnademo-tvOS, dnademo-tvOSTests
    - Step 6: Select 'dnademo' from the TARGETS list then navigate to the 'Signing & Capabilities' Tab and do the following steps:
        - Make sure the 'Automaticaly Manage Signing' checkbox is checked.
        - __Team__: Choose your newly added account from the dropdown
        - The 'Signing Certificate' should now say : 'Apple Development'
        - Change the 'Bundle Identifier' name to something unique. (Good start would be adding the date at the end) Example: `org.react-native.dnademo2020-May6`
    - Step 7: Now, move to 'Build Settings' Tab
        - Go to 'Signing' section and change 'Code Signing Identity' to iOS Developer.
    - Step 8: Now, select 'dnademoTests' from the 'Targets' section > Repeat the signing process as done in Step 6
    - Step 8: Choose your connected device
        > Go to'Product' menu on Xcode
        > Destination > *select your connected device*
    - Step 9: Build application by clicking on the 'Play' button on the top left corner of the Xcode screen.
        > *If your device prompts you with whether you trust the computer -> Click on 'Trust' {This process might take a while. Wait patiently}*
    - Step 10: In your iPad, when prompted with an alert/error saying "Could not launch dnademo" or "Untrusted Developer", follow these steps:
        > In your iPad > Go to General Setting > Device Management > Choose the development application
        > Click on the 'Trust' option
        > Re-build application from Xcode.


### FRONT END
-------------
**Change the Look & Feel of the application to suit your style**

1. **Change preset/sample data**

    Go to folder '/dnademo/Components/SampleScreens'

    Edit 'Preset.json' (Make sure the formatting is maintained and has 6 sample values)

2. **Styling and Formatting**

    Go to folder '/dnademo/Components'

    Open Drawing Board.js
    
    - For Results from Output Screen: 
        
        * Line No: 42 Change Stroke Thickness for the output and sample traces
        * Line No: 43 Change Stroke Color for the 5 results displayed
        * Line No: 44 Change Font Face of text content(name, time and confidence) for results from output [(List of available font families)](https://github.com/react-native-training/react-native-fonts/blob/master/README.md)
        * Line No: 45 Change Color of text content(name, time and confidence) for results from output
       
    - For User Inputs/Samples from Drawing Board and Preset Screen:
        
        * Line No: 48 Change Stroke Color for user input
        * Line No: 49 Change Stroke Thickness for the user input
        * Line No: 50 Change Stroke Color for the 6 preset sample data
