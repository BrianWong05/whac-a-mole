# Configure Capacitor Android Build

Targeting Android APK generation with specific configuration requirements.

## Goal Description
Configure the Capacitor environment for "Hand-Eye Training" (手眼協調大冒險) on Android. This includes setting up the correct App ID, App Name, Web Directory, and enforcing landscape orientation in the Android Manifest.

## User Review Required
> [!IMPORTANT]
> The `package.json` does not list Capacitor dependencies, and `capacitor.config.ts` is missing. This proposal validates the assumption that these need to be installed/created.

## Proposed Changes

### Dependencies
#### [MODIFY] [package.json](file:///Users/brianwong/Project/react/whac-a-mole/package.json)
- Install `@capacitor/core`, `@capacitor/cli`, `@capacitor/android`.

### Project Configuration
#### [NEW] [capacitor.config.ts](file:///Users/brianwong/Project/react/whac-a-mole/capacitor.config.ts)
- Initialize with:
  - `appId`: `com.whacamole.training`
  - `appName`: `手眼協調大冒險`
  - `webDir`: `dist`

### Android Platform
#### [NEW/MODIFY] [AndroidManifest.xml](file:///Users/brianwong/Project/react/whac-a-mole/android/app/src/main/AndroidManifest.xml)
- Ensure `android:screenOrientation="sensorLandscape"` in `<activity>`.
- Ensure `android:exported="true"`.

## Verification Plan

### Automated Tests
- Run `npx cap sync` to verify configuration.

### Manual Verification
- Open in Android Studio: `npx cap open android`.
- Build APK using the menu: `Build > Build Bundle(s) / APK(s) > Build APK(s)`.
