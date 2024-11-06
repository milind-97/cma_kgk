// plugins/imageSliderPlugin.ts

import pluginManager from '../utils/pluginManager';
import ImageSlider from '../components/ImageSlider'; // Assume this component exists

const imageSliderPlugin = {
  name: 'Image Slider',
  description: 'A simple image slider plugin.',
  version: '1.0.0',
  register: (api) => {
    api.registerContentBlock('ImageSlider', ImageSlider);
  },
};

// Register the plugin
pluginManager.registerPlugin(imageSliderPlugin);
