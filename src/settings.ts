import { PluginSettingTab, App, Setting } from 'obsidian';
import BetterLinks from './main';

export interface BetterLinksSettings {
  internalFg: string;
  internalFgHover: string;
  internalUnderlineHover: string;
  externalFg: string;
  externalFgHover: string;
  externalUnderlineHover: string;
  underlineEnabled: boolean;
}

export const DEFAULT_SETTINGS: BetterLinksSettings = {
  internalFg: 'rgb(0, 255, 255)',
  internalFgHover: 'rgb(255, 255, 255)',
  internalUnderlineHover: 'rgb(0, 148, 158)',
  externalFg: 'rgb(255, 0, 221)',
  externalFgHover: 'rgb(255, 255, 255)',
  externalUnderlineHover: 'rgb(177, 0, 153)',
  underlineEnabled: true,
};

export class BetterLinksSettingTab extends PluginSettingTab {
  plugin: BetterLinks;

  constructor(app: App, plugin: BetterLinks) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl('h2', { text: 'Better Links Settings' });

    // Internal link colors
    new Setting(containerEl)
      .setName('Internal Link Color')
      .setDesc('Cor dos links internos')
      .addColorPicker(picker => picker
        .setValue(this.plugin.settings.internalFg)
        .onChange(async (value) => {
          this.plugin.settings.internalFg = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Internal Link Hover Color')
      .setDesc('Cor ao passar o mouse nos links internos')
      .addColorPicker(picker => picker
        .setValue(this.plugin.settings.internalFgHover)
        .onChange(async (value) => {
          this.plugin.settings.internalFgHover = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('Internal Link Underline Color (Hover)')
      .setDesc('Cor do underline interno ao passar o mouse')
      .addColorPicker(picker => picker
        .setValue(this.plugin.settings.internalUnderlineHover)
        .onChange(async (value) => {
          this.plugin.settings.internalUnderlineHover = value;
          await this.plugin.saveSettings();
        }));

    // External link colors
    new Setting(containerEl)
      .setName('External Link Color')
      .setDesc('Cor dos links externos')
      .addColorPicker(picker => picker
        .setValue(this.plugin.settings.externalFg)
        .onChange(async (value) => {
          this.plugin.settings.externalFg = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('External Link Hover Color')
      .setDesc('Cor ao passar o mouse nos links externos')
      .addColorPicker(picker => picker
        .setValue(this.plugin.settings.externalFgHover)
        .onChange(async (value) => {
          this.plugin.settings.externalFgHover = value;
          await this.plugin.saveSettings();
        }));

    new Setting(containerEl)
      .setName('External Link Underline Color (Hover)')
      .setDesc('Cor do underline externo ao passar o mouse')
      .addColorPicker(picker => picker
        .setValue(this.plugin.settings.externalUnderlineHover)
        .onChange(async (value) => {
          this.plugin.settings.externalUnderlineHover = value;
          await this.plugin.saveSettings();
        }));

    // Underline toggle
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
