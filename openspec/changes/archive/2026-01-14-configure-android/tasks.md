# Tasks: Configure Capacitor Android Build

- [x] Install Capacitor Dependencies <!-- id: 1 -->
    - `npm install @capacitor/core @capacitor/cli @capacitor/android`
- [x] Initialize Capacitor Config <!-- id: 2 -->
    - Create `capacitor.config.ts` with requested settings.
- [x] Initialize Android Platform <!-- id: 3 -->
    - `npx cap add android` (if not present)
    - Install `typescript` (dev dep) if missing.
- [x] Update Android Manifest <!-- id: 4 -->
    - Add `screenOrientation="sensorLandscape"`
    - Check `exported="true"`
- [x] Sync Project <!-- id: 5 -->
    - `npm run build`
    - `npx cap sync`
- [x] Provide Build Instructions <!-- id: 6 -->
    - Document steps for APK generation.
