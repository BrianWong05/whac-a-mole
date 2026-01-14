import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.whacamole.training',
  appName: '手眼協調大冒險',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
