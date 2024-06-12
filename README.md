# ReactNativeAndroidApp

### dev
Add the following to your .bashrc file:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/10.0/bin
```

In RNAndroid directory:
```bash
npm run android
npm run ios # you need to use macOS to build the iOS project - use the Expo app if you need to do iOS development without a Mac
npm run web
```

You need to have Android Studio installed on your computer.


