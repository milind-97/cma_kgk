// utils/pluginManager.ts

interface Plugin {
  name: string;
  description: string;
  version: string;
  register: (registerAPI: PluginAPI) => void; // Function to register plugin
}

interface PluginAPI {
  registerContentBlock: (type: string, component: React.FC) => void;
  // Additional API methods can be added here
}

class PluginManager {
  private plugins: Plugin[] = [];
  private contentBlocks: Record<string, React.FC> = {};

  registerPlugin(plugin: Plugin) {
    this.plugins.push(plugin);
    plugin.register(this.createAPI());
  }

  private createAPI(): PluginAPI {
    return {
      registerContentBlock: (type, component) => {
        this.contentBlocks[type] = component;
      },
    };
  }

  getContentBlocks() {
    return this.contentBlocks;
  }
}

const pluginManager = new PluginManager();
export default pluginManager;
