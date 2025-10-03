import { Plugin } from 'obsidian';
import { BetterLinksSettings, DEFAULT_SETTINGS, BetterLinksSettingTab } from './settings';
import { applyCSSVars } from './css-vars';

export default class BetterLinks extends Plugin {
  settings: BetterLinksSettings;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new BetterLinksSettingTab(this.app, this));
    this.applyCSSVars();
  }

  applyCSSVars() {
    applyCSSVars(this.settings);
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.applyCSSVars();
  }
}
