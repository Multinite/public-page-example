"use client";
import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  PPC_messageType,
  PPC_data_response,
  InitialTabManagerState,
  NotificationType,
  TabManagerLisenerUnsubscribe,
  TabInfo,
  TabListener,
  PPC_data_await,
} from "./types";

//@ts-ignore
const TabManagerContext = createContext<InitialTabManagerState<any>>();

interface DataAwaitQueue {
  callback: (data: any) => void;
  uid: string;
}

function TabManagerProvider({ children }: { children: ReactNode }) {
  const data_await_queue = useRef<DataAwaitQueue[]>([]);
  const [tab, setTab] = useState<TabInfo | null>(null);
  const tabEvents = useRef<
    {
      tabListener: TabListener;
      listenerId: string;
    }[]
  >([]);

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
      const listenerId = crypto.randomUUID();

      const { event_, cb_ } = {
        event_: event as "start",
        cb_: cb as () => void,
      };

      tabEvents.current.push({
        listenerId,
        tabListener: {
          callback: cb_,
          tabId: "This_only_exists_for_typesafety_lol",
          type: event_,
        },
      });

      const data: PPC_messageType = {
        type: "add_tab_listener",
        data: {
          type: event,
          listenerId: listenerId,
        },
        error: null,
        success: true,
      };

      window.top?.postMessage(data, "*");

      const UnSub: TabManagerLisenerUnsubscribe = () => {
        const data: PPC_messageType = {
          type: "remove_tab_listener",
          data: {
            listenerId,
          },
          error: null,
          success: true,
        };
        window.top?.postMessage(data, "*");
        let tab_event = tabEvents.current.find(
          (x) => x.listenerId === listenerId
        );
        if (tab_event) {
          tabEvents.current = tabEvents.current.filter(
            (x) => x.listenerId !== listenerId
          );
          if (tab_event.tabListener.type === "close") {
            tab_event.tabListener.callback({
              defer() {
                const data: PPC_messageType = {
                  type: "tab_defer_event",
                  data: {
                    listenerId: listenerId,
                  },
                  error: null,
                  success: true,
                };
                window.top?.postMessage(data, "*");

                return () => {
                  const data: PPC_messageType = {
                    type: "tab_defer_resolve_event",
                    data: {
                      listenerId: listenerId,
                    },
                    error: null,
                    success: true,
                  };
                  window.top?.postMessage(data, "*");
                };
              },
            });
          } else {
            tab_event.tabListener.callback();
          }
        }
      };
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
      loadFinished() {
        const data: PPC_messageType = {
          type: "performance_load_finished",
          data: null,
          error: null,
          success: true,
        };
        window.top?.postMessage(data, "*");
      },
      mark(name, hint) {
        return null;
      },
    },
    setTabIcon(icon) {
      const data: PPC_messageType = {
        type: "set_tab_icon",
        data: {
          icon: icon as ReactElement,
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
    tab: tab,
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

        const { type, success, error, data }: PPC_messageType = event.data;

        if (type === "heartbeat") {
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
            document.head.appendChild(cssLink);
            document.documentElement.classList.add(data.current_theme);
            document.documentElement.style.setProperty("colorScheme", "dark");
            setTab(data.tabDetails);
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
        } else if (type === "data_response") {
          if (data.request_type === "systenInfo") {
            if (!success) {
              console.error("[TabManager] Error:", error);
              const res: PPC_messageType = {
                type: "log",
                data: {
                  logDeats: {
                    content: ["[TabManager] Error:", error],
                    logStyle: "error",
                  },
                },
                error: null,
                success: true,
              };
              window.top?.postMessage(res, "*");
              return;
            }
          }

          if (!success) {
            console.error("[TabManager] Error:", error);
            const res: PPC_messageType = {
              type: "log",
              data: {
                logDeats: {
                  content: ["[TabManager] Error:", error],
                  logStyle: "error",
                },
              },
              error: null,
              success: true,
            };
            window.top?.postMessage(res, "*");
            return;
          }
          data_await_queue.current
            .filter((x) => x.uid === data.request_uid)
            .forEach((x) => x.callback(data));
        } else if (type === "tab_event") {
          tabEvents.current.forEach((x) =>
            x.tabListener.callback({
              defer: () => {
                const data: PPC_messageType = {
                  type: "tab_defer_event",
                  data: {
                    listenerId: x.listenerId,
                  },
                  error: null,
                  success: true,
                };
                window.top?.postMessage(data, "*");

                return () => {
                  const data: PPC_messageType = {
                    type: "tab_defer_resolve_event",
                    data: {
                      listenerId: x.listenerId,
                    },
                    error: null,
                    success: true,
                  };
                  window.top?.postMessage(data, "*");
                };
              },
            })
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
