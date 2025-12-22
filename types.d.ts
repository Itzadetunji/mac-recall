type Statistics = {
  cpuUsage: number;
  ramUsage: number;
  storageUsage: number;
};

type StaticData = {
  totalStorage: number;
  cpuModel: string;
  totalMemoryGB: number;
};

type View = "CPU" | "RAM" | "STORAGE";

type FrameWindowAction = "CLOSE" | "MAXIMIZE" | "MINIMIZE";

type Image = {
  name: string;
  url: string;
  timestamp: string;
};

type Settings = {
  interval: number;
};

// biome-ignore lint/correctness/noUnusedVariables: <global types>
type EventPayloadMapping = {
  statistics: Statistics;
  getStaticData: StaticData;
  changeView: View;
  sendFrameAction: FrameWindowAction;
  getImages: Image[];
  getSettings: Settings;
  saveSettings: boolean;
};

type UnsubscribeFunction = () => void;

// biome-ignore lint/correctness/noUnusedVariables: <global types>
interface Window {
  electron: {
    // This is a promise because it is working like an API request
    subscribeStatistics: (callback: (statistics: Statistics) => void) => UnsubscribeFunction;
    getStaticData: () => Promise<StaticData>;
    subscribeChangeView: (callback: (view: View) => void) => UnsubscribeFunction;
    sendFrameAction: (payload: FrameWindowAction) => void;
    getImages: () => Promise<Image[]>;
    getSettings: () => Promise<Settings>;
    saveSettings: (interval: number) => Promise<boolean>;
  };
}
