# dna-demo-app
===================
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

1. Change preset/sample data

    Go to folder '/dnademo/Components/SampleScreens'

    Edit Preset.json (Make sure the formatting is maintained and has 6 sample values)

2. Styling and Formatting

    Go to folder '/dnademo/Components/SampleScreens'

    Open Drawing Board.js
    
    ~~~Mention line numbers or code blocks to be edited~~~

### BUILD AND DEPLOYMENT
-------------

1. To build complete react native package (has to be done to make changes to formatting)

    ** Make sure node.js and npm is installed // download and install from official website **

    - Step 1: Clone complete repository from git
    - Step 2: Go to folder 'dnademo'

            ```bash
            npm install --save
            npm build
            npm start (or) react-native start 
            ```
    - Step 3: Go to 'ios' folder inside /dnademo

            ```bash
            pod install // This step will install all the dependencies into ios workspace
            ```

2. Testing application on virtual simulator

    - Step 1: Move to 'dnademo' folder
    - Step 2: Run command below to open console log for your simulator

        - IOS:

            ```bash
            react-native run-ios
            ```

            * -> To specify target device simulator

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
    - Step 5: Click on the run button on the top-left corner of the screen.

        -> Choose target simulator by clicking on available devices dropdown option near your project name. (next to the run button)
            (or) Xcode Menu -- Product -- Destination -- *choose from available device*

3. Deploying on actual device

### BACK END
-------------