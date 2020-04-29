# dna-demo-app
======================
- This project is about developing an interactive Android/iOS app which takes a random scribble as an input and returns a list of organisms with DNA sequence that closely matches the input scribble. The app is developed as a powerful, interactive tool to demo the newly developed DNA sequencer device to the public in a fun and interesting manner.

## DOCUMENTATION

### PREREQUISITES
-------------
- Node

    ```bash
    brew install node
    ```

- Watchman

    ```bash
    brew install watchman
    ```

- Cocopods

    ```bash
    sudo gem install cocoapods
    ```

### FRONT END
-------------

1. **Change preset/sample data**

    Go to folder '/dnademo/Components/SampleScreens'

    Edit 'Preset.json' (Make sure the formatting is maintained and has 6 sample values)

2. **Styling and Formatting**

    Go to folder '/dnademo/Components'

    Open Drawing Board.js
    
        For Results from Output Screen: 
        
        Line No: 37 Change Stroke Thickness for the output and sample traces
        Line No: 38 Change Stroke Color for the 5 results displayed
        Line No: 39 Change Font Face of text content(name, time and confidence) for results from output
        Line No: 40 Change Color of text content(name, time and confidence) for results from output
       
        For User Inputs/Samples from Drawing Board and Preset Screen:
        
        Line No: 43 Change Stroke Color for user input
        Line No: 44 Change Stroke Thickness for the user input
        Line No: 45 Change Stroke Color for the 6 preset sample data
    
    

### BUILD AND DEPLOYMENT
-------------

1. **To build complete react native package (has to be done to make changes to formatting)**

    ** Make sure node.js and npm is installed // download and install from official website **

    - Step 1: Clone complete repository from git
    - Step 2: Go to folder 'dnademo'

        ```bash
        npm install --save
        npm build
        ```

    - Step 3: Go to 'ios' folder inside /dnademo (This step will install all the dependencies into ios workspace)

        ```bash
        pod install 
        ```

2. **Testing application on virtual simulator**

    - Step 1: Move to 'dnademo' folder
    - Step 2: Run command below to open console log for your simulator

        - IOS:

            ```bash
            npx react-native run-ios
            ```

            * -> To specify target device simulator

                * Go to Xcode > 'Preferences' menu > 'Location' section > Add your Xcode version to the 'Command Line Tools'. Continue executing commands below in the terminal.

                List all available simulator:

                ```bash
                xcrun simctl list devices
                ```

                Select a device from list:

                ```bash
                npm react-native run-ios --simulator="iPad Pro (12.9-inch) (3rd generation)"
                ```
            OR

            ```bash
            npm start
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

3. **Deploying on physical device**

    - Step 1: Go to folder 'dnademo'
        > Open 'dnademo.xcworkspace' using your Xcode
    - Step 2: Request your certificates/ Code Signing
        > Go to 'Preferences' menu in Xcode and navigate to 'Accounts' tab
            >  Fill in your Apple iOS account details here
            >  Click on 'Manage Certificates'
            >  If you click the “+” icon below the certificates pane, you can request a new iOS Development Certificate and an iOS             Distribution Certificate(not mandatory)
    - Step 3: Connect your device to the computer
    - Step 4: Select 'dnademo' from the project navigator in Xcode
    - Step 5: Go to 'General' tab
    - Step 6: Makes the following changes under the 'Signing' section
        - Check the 'Automaticaly Manage Signing' checkbox
        - __Team:__ : Choose your newly added account from the dropdown
        - Make sure the 'Signing Certificate' is iOS Developer
    - Step 7: In the pane to the left of 'General' tab > Select 'dnademoTests' > Repeat the signing process as done in Step 6
    - Step 8: Choose your connected device
        > Go to'Product' menu on Xcode
        > Destination > *select your connected device*
    - Step 9: Run your application
        > *If your device prompts you whether you trust the computer -> Click on 'Trust' {This process might take a while. Wait patiently}*
    - Step 10: When prompted with an alert/error saying "Could not launch dnademo", follow these steps:
        > In your iPad > Go to General Setting > Device Management > Choose the development application
        > Click on the 'Trust' option
        > Re-build application from Xcode.

### BACK END
-------------
