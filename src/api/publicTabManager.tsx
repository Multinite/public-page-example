import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

//@ts-ignore
import type {
  PPC_messageType,
  //@ts-ignore
  PPC_data_await,
  //@ts-ignore
} from "./../../../../multinite-server/src/app/components/_mainNav/PPC";

//* NOTE: If this type is updated, make sure to update it in the multinite-public-tab-manager's API as well.
type NotificationType =
  | "number"
  | "call"
  | "dot-paulse"
  | "check"
  | "cross"
  | "dot"
  | "none"
  | "bell";

export type { NotificationType };

//* NOTE: This type was copied from multinite's tabManagerProvider.tsx
interface TabInfoI {
  name: string;
  type: "chat" | "new-tab" | "content" | "loading" | "profile" | "public";
  id: string;
  closeable: boolean;
  isActive: boolean;
  isLoading: boolean;
  isPinned: boolean;
  isPlayingAudio: boolean;
  path: `/${string}`;
  notificationType: NotificationType;
  notificationCount: number;
  tabProperties?: {};
}
//* NOTE: This type was copied from multinite's tabManagerProvider.tsx
interface TabInfo_loading extends TabInfoI {
  type: "loading";
  path: "/loading";
  tabProperties: {};
}
//* NOTE: This type was copied from multinite's tabManagerProvider.tsx
interface TabInfo_chat extends TabInfoI {
  type: "chat";
  tabProperties: {};
  path: `/chat` | `/chat/${string}`;
}
//* NOTE: This type was copied from multinite's tabManagerProvider.tsx
interface TabInfo_public extends TabInfoI {
  type: "public";
  tabProperties: {
    page: string;
  };
  path: `/public` | `/public/${string}`;
}
//* NOTE: This type was copied from multinite's tabManagerProvider.tsx
interface TabInfo_new_tab extends TabInfoI {
  type: "new-tab";
  path: `/new-tab` | `/new-tab/${string}`;
  tabProperties: {};
}
//* NOTE: This type was copied from multinite's tabManagerProvider.tsx
interface TabInfo_content extends TabInfoI {
  type: "content";
  path:
    | `/content`
    | `/content/music`
    | `/content/video`
    | `/content/stream`
    | `/content?s=${string}`;

  tabProperties: {
    source: string;
  };
}

//* NOTE: This type was copied from multinite's tabManagerProvider.tsx
interface TabInfo_profile extends TabInfoI {
  type: "profile";
  path: "/profile" | `/profile/@${string}`;
  tabProperties: {
    uid?: string;
  };
}

//* Copied from colorLog.ts
type cLogStyleType = "success" | "error" | "info" | "warning";
//* Copied from globalTabManager.tsx
type TabLogType = cLogStyleType | "test";

//* NOTE: This type was copied from multinite's tabManagerProvider.tsx
type TabInfo =
  | TabInfo_content
  | TabInfo_loading
  | TabInfo_chat
  | TabInfo_public
  | TabInfo_profile
  | TabInfo_new_tab;

type ProceedDeferFnc = () => void;
type TabListenerDeferFunction = () => ProceedDeferFnc;
type TabListener = {
  type: "close" | "focus" | "blur" | "moved" | "start";
  tabId: TabInfo["id"];
  callback: (event: { defer: TabListenerDeferFunction }) => void;
};

type TabManagerLisenerUnsubscribe = () => void;

type InitialTabManagerState = {
  tab: TabInfo | null;
  tabAlert: (alertProps: { body: ReactElement }) => Promise<void>;
  on: (
    event: "close" | "focus" | "blur" | "moved" | "start", //TODO: Add all the functionality of all the events.
    cb: TabListener["callback"]
  ) => TabManagerLisenerUnsubscribe;
  setTabName: (name: string) => void;
  setTabIcon: (icon: string) => void;
  performance: {
    mark: (name: string, hint?: string) => null | number;
    loadFinished: () => void;
  };
  log: (logDeats: {
    content:
      | [`[${string}] ${string | ""}`, ...any]
      | [`[${string}] ${string | ""}`]
      | `[${string}] ${string | ""}`;
    logStyle?: TabLogType;
  }) => void;
  notification: {
    getNotificationCount: () => Promise<number>;
    getCurrentNotificationType: () => Promise<NotificationType>;
    setNotificationType: (type: NotificationType) => void;
    addNotificationNumber: (count: number) => void;
    removeNotificationNumber: (count: number) => void;
    setNotificationNumber: (count: number) => void;
  };
  path: {
    setPath: (url: TabInfo["path"]) => void;
    getPath: () => TabInfo["path"];
    onPathUpdate: (cb: (path: TabInfo["path"]) => void) => void;
  };
};

//@ts-ignore
const TabManagerContext = createContext<InitialTabManagerState<any>>();

interface DataAwaitQueue {
  callback: (data: any) => void;
  uid: string;
}

function TabManagerProvider({ children }: { children: ReactNode }) {
  const data_await_queue = useRef<DataAwaitQueue[]>([]);

  const data_await = useCallback(function data_await<T>({
    callback,
    request_type,
    uid,
  }: {
    callback: (data: T) => void;
    uid: string;
    request_type: PPC_data_await["data"]["request_type"];
  }) {
    data_await_queue.current.push({ callback, uid });
    const data: PPC_messageType = {
      type: "data_await",
      success: true,
      data: {
        request_type,
        request_uid: uid,
      },
      error: null,
    };
    window.top?.postMessage(data, "*");
  },
  []);

  const init: InitialTabManagerState = {
    log(logDeats) {
      const data: PPC_messageType = {
        type: "log",
        data: {
          logDeats,
        },
        error: null,
        success: true,
      };
      window.top?.postMessage(data, "*");
    },
    notification: {
      addNotificationNumber(count) {
        const data: PPC_messageType = {
          type: "notification_add",
          data: {
            count,
          },
          error: null,
          success: true,
        };
        window.top?.postMessage(data, "*");
      },
      getCurrentNotificationType() {
        return new Promise((res) => {
          data_await<NotificationType>({
            callback: res,
            request_type: "notificationType",
            uid: crypto.randomUUID(),
          });
        });
      },
      getNotificationCount() {
        return new Promise((res) => {
          data_await<number>({
            callback: res,
            request_type: "notificationCount",
            uid: crypto.randomUUID(),
          });
        });
      },
      removeNotificationNumber(count) {
        const data: PPC_messageType = {
          type: "notification_remove",
          data: {
            count: count,
          },
          error: null,
          success: true,
        };
        window.top?.postMessage(data, "*");
      },
      setNotificationNumber(count) {
        const data: PPC_messageType = {
          type: "notification_set",
          data: {
            count,
          },
          error: null,
          success: true,
        };
        window.top?.postMessage(data, "*");
      },
      setNotificationType(type) {
        const data: PPC_messageType = {
          type: "notificationType_set",
          data: {
            type,
          },
          error: null,
          success: true,
        };
        window.top?.postMessage(data, "*");
      },
    },
    on(event, cb) {
      const UnSub: TabManagerLisenerUnsubscribe = () => {};
      return UnSub;
    },
    path: {
      //@ts-ignore
      getPath() {
        return "";
      },
      onPathUpdate(cb) {},
      setPath(url) {},
    },
    performance: {
      loadFinished() {},
      mark(name, hint) {
        return null;
      },
    },
    setTabIcon(icon) {
      const data: PPC_messageType = {
        type: "set_tab_icon",
        data: {
          icon,
        },
        error: null,
        success: true,
      };
      window.top?.postMessage(data, "*");
    },
    setTabName(name) {
      const data: PPC_messageType = {
        type: "set_tab_name",
        data: {
          name,
        },
        error: null,
        success: true,
      };
      window.top?.postMessage(data, "*");
    },
    tab: null,
    tabAlert(alertProps) {
      return new Promise((res) => {
        const data: PPC_messageType = {
          type: "tab_alert",
          data: {
            //@ts-ignore
            alertProps,
          },
          error: null,
          success: true,
        };
        window.top?.postMessage(data, "*");
        res();
      });
    },
  };

  useEffect(() => {
    window.addEventListener(
      "message",
      (event) => {
        if (
          !["https://multinite.com", "http://localhost:3000"].includes(
            event.origin
          )
        )
          return;

        const { type, success, error, data }: PPC_messageType = JSON.parse(
          event.data
        );

        if (type === "heartbeat") {
          console.log("heartbeat received");
          const data: PPC_messageType = {
            type: "heartbeat_response",
            data: null,
            error: null,
            success: true,
          };
          window.top?.postMessage(data, "*");
        } else if (type === "init") {
          if (success) {
            const cssLink = document.createElement("link");
            cssLink.href = data.css_path;
            cssLink.rel = "stylesheet";
            cssLink.type = "text/css";
            console.log(`applying CSS.`);
            document.head.appendChild(cssLink);
            document.documentElement.classList.add(data.current_theme);
            document.documentElement.style.setProperty("colorScheme", "dark");
          } else {
            throw new Error("Failed to initialize", {
              cause: error,
            });
          }
        } else if (type === "theme_change") {
          document.documentElement.classList.remove(data.old_theme);
          document.documentElement.classList.add(data.new_theme);
          document.documentElement.style.setProperty(
            "colorScheme",
            data.colorScheme || "dark"
          );
        }
      },
      false
    );
  }, []);

  return (
    <TabManagerContext.Provider value={init}>
      {children}
    </TabManagerContext.Provider>
  );
}

function useTabManager(): InitialTabManagerState {
  const context = useContext(TabManagerContext);

  if (context === undefined) {
    throw new Error("useTabManager must be used within a TabManagerProvider");
  }
  return context;
}

export { TabManagerProvider, useTabManager };
