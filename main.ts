import { Plugin, PluginSettingTab, Setting } from 'obsidian';

interface BetterLinksSettings {
  internalFg: string;
  internalFgHover: string;
  internalUnderlineHover: string;
  externalFg: string;
  externalFgHover: string;
  externalUnderlineHover: string;
  underlineEnabled: boolean;
}

const DEFAULT_SETTINGS: BetterLinksSettings = {
  internalFg: 'rgb(0, 255, 255)',
  internalFgHover: 'rgb(255, 255, 255)',
  internalUnderlineHover: 'rgb(0, 148, 158)',
  externalFg: 'rgb(255, 0, 221)',
  externalFgHover: 'rgb(255, 255, 255)',
  externalUnderlineHover: 'rgb(177, 0, 153)',
  underlineEnabled: true,
};

export default class BetterLinks extends Plugin {
  settings: BetterLinksSettings;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new BetterLinksSettingTab(this.app, this));

    // Aplica as variáveis CSS
    this.applyCSSVars();
  }

  applyCSSVars() {
    const root = document.documentElement;
    root.style.setProperty('--better-internal-fg', this.settings.internalFg);
    root.style.setProperty('--better-internal-fg-hover', this.settings.internalFgHover);
    root.style.setProperty('--better-internal-underline-hover', this.settings.internalUnderlineHover);

    root.style.setProperty('--better-external-fg', this.settings.externalFg);
    root.style.setProperty('--better-external-fg-hover', this.settings.externalFgHover);
    root.style.setProperty('--better-external-underline-hover', this.settings.externalUnderlineHover);

    root.style.setProperty('--better-underline-enabled', this.settings.underlineEnabled ? '1' : '0');
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.applyCSSVars();
  }
}

class BetterLinksSettingTab extends PluginSettingTab {
  plugin: BetterLinks;

  constructor(app: any, plugin: BetterLinks) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Better Links Settings' });

    new Setting(containerEl)
      .setName('Internal Link Color')
      .setDesc('Cor dos links internos')
      .addText(text => text
        .setPlaceholder('rgb(...) ou #hex')
        .setValue(this.plugin.settings.internalFg)
        .onChange(async (value) => {
          this.plugin.settings.internalFg = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Internal Link Hover Color')
      .setDesc('Cor ao passar o mouse nos links internos')
      .addText(text => text
        .setPlaceholder('rgb(...) ou #hex')
        .setValue(this.plugin.settings.internalFgHover)
        .onChange(async (value) => {
          this.plugin.settings.internalFgHover = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Internal Link Underline Color (Hover)')
      .setDesc('Cor do underline interno ao passar o mouse')
      .addText(text => text
        .setPlaceholder('rgb(...) ou #hex')
        .setValue(this.plugin.settings.internalUnderlineHover)
        .onChange(async (value) => {
          this.plugin.settings.internalUnderlineHover = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('External Link Color')
      .setDesc('Cor dos links externos')
      .addText(text => text
        .setPlaceholder('rgb(...) ou #hex')
        .setValue(this.plugin.settings.externalFg)
        .onChange(async (value) => {
          this.plugin.settings.externalFg = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('External Link Hover Color')
      .setDesc('Cor ao passar o mouse nos links externos')
      .addText(text => text
        .setPlaceholder('rgb(...) ou #hex')
        .setValue(this.plugin.settings.externalFgHover)
        .onChange(async (value) => {
          this.plugin.settings.externalFgHover = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('External Link Underline Color (Hover)')
      .setDesc('Cor do underline externo ao passar o mouse')
      .addText(text => text
        .setPlaceholder('rgb(...) ou #hex')
        .setValue(this.plugin.settings.externalUnderlineHover)
        .onChange(async (value) => {
          this.plugin.settings.externalUnderlineHover = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Underline Enabled')
      .setDesc('Se o underline animado deve aparecer')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.underlineEnabled)
        .onChange(async (value) => {
          this.plugin.settings.underlineEnabled = value;
          await this.plugin.saveSettings();
        }));
  }
}
