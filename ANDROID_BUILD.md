# Android Build Instructions

## Prerequisites
- **Android Studio** installed.
- **Project Initialized**: `npm install`, `npm run build`, `npx cap sync`.

## Steps to Generate APK

1. **Open Android Project**
   Run the following command in your terminal:
   ```bash
   npx cap open android
   ```
   This will launch Android Studio with your project loaded.

2. **Wait for Gradle Sync**
   Allow Android Studio to finish syncing Gradle files (look for the progress bar at the bottom).

3. **Build APK**
   - Go to the top menu: **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
   - *Note: Do not confuse this with "Generate Signed Bundle / APK" unless you are preparing for the Play Store.*

4. **Locate the APK**
   - Once the build is complete, a popup will appear at the bottom right: "APK(s) generated successfully..."
   - Click **locate** in that popup.
   - OR navigate manually to:
     `android/app/build/outputs/apk/debug/app-debug.apk`

## Troubleshooting
- **Gradle Errors**: If you see "Unsupported class file major version", ensure your Gradle JDK matching your Android Studio version (Settings > Build, Execution, Deployment > Build Tools > Gradle).
- **Update Changes**: If you modify web code (React), always run:
  ```bash
- **Update Changes**: If you modify web code (React), always run:
  ```bash
  npm run cap:sync
  ```
  before building in Android Studio.
