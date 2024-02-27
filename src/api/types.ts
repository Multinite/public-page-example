import { ReactElement } from "react";

interface ErrorI {
  code: string; // all capital, underscores for spaces. Eg: "NOT_FOUND"
  message: string; // human readable error msg
  details: any; // developer readable error msg
  hint?: string;
  path?: string; // code path that caused the err. Eg: "foo.err()"
  httpStatus?: number;
}
export type { ErrorI };

interface PPC_message {
  type: string;
  success: boolean;
  error: ErrorI | null;
  data: any | null;
}

type tabManagerstate = InitialTabManagerState;

interface PPC_notification_add extends PPC_message {
  type: "notification_add";
  success: true;
  data: {
    count: Parameters<
      tabManagerstate["notification"]["addNotificationNumber"]
    >[0];
  };
  error: null;
}
interface PPC_notification_remove extends PPC_message {
  type: "notification_remove";
  success: true;
  data: {
    count: Parameters<
      tabManagerstate["notification"]["addNotificationNumber"]
    >[0];
  };
  error: null;
}

interface PPC_add_tab_listener extends PPC_message {
  type: "add_tab_listener";
  success: true;
  data: {
    type: TabListener["type"];
    listenerId: string;
  };
  error: null;
}
interface PPC_tab_unsub_defer extends PPC_message {
  type: "tab_defer_event";
  success: true;
  data: {
    listenerId: string;
  };
  error: null;
}
interface PPC_tab_unsub_defer_resolve extends PPC_message {
  type: "tab_defer_resolve_event";
  success: true;
  data: {
    listenerId: string;
  };
  error: null;
}
interface PPC_remove_tab_listener extends PPC_message {
  type: "remove_tab_listener";
  success: true;
  data: {
    listenerId: string;
  };
  error: null;
}
interface PPC_tab_event extends PPC_message {
  type: "tab_event";
  success: true;
  data: {
    event: TabListener["type"];
    listenerId: string;
  };
  error: null;
}

interface PPC_tab_alert extends PPC_message {
  type: "tab_alert";
  success: true;
  data: {
    alertProps: Parameters<tabManagerstate["tabAlert"]>[0];
  };
  error: null;
}
interface PPC_notification_set extends PPC_message {
  type: "notification_set";
  success: true;
  data: {
    count: Parameters<
      tabManagerstate["notification"]["setNotificationNumber"]
    >[0];
  };
  error: null;
}
interface PPC_notificationType_set extends PPC_message {
  type: "notificationType_set";
  success: true;
  data: {
    type: Parameters<tabManagerstate["notification"]["setNotificationType"]>[0];
  };
  error: null;
}
interface PPC_data_await extends PPC_message {
  type: "data_await";
  success: true;
  data: {
    request_type:
      | "notificationType"
      | "notificationCount"
      | "systenInfo"
      | "fullscreenRequest";
    request_uid: string;
  };
  error: null;
}

interface PPC_data_response_TEMPLATE extends PPC_message {
  type: `data_response`;
  success: boolean;
  data:
    | {
        request_type: PPC_data_await["data"]["request_type"];
        request_uid: string;
        response: any;
      }
    | {
        request_type: PPC_data_await["data"]["request_type"];
      };
  error: ErrorI | null;
}

interface PPC_data_response_success extends PPC_data_response_TEMPLATE {
  type: `data_response`;
  success: true;
  data: {
    request_type: PPC_data_await["data"]["request_type"];
    request_uid: string;
    response: any;
  };
  error: null;
}

interface PPC_data_response_fail extends PPC_data_response_TEMPLATE {
  type: `data_response`;
  success: false;
  data: {
    request_type: PPC_data_await["data"]["request_type"];
  };
  error: ErrorI;
}

type PPC_data_response = PPC_data_response_success | PPC_data_response_fail;
export type { PPC_data_await, PPC_data_response };

interface PPC_log extends PPC_message {
  type: "log";
  success: true;
  data: {
    logDeats: Parameters<InitialTabManagerState["log"]>[0];
  };
  error: null;
}

interface PPC_heartbeat extends PPC_message {
  type: "heartbeat";
  success: true;
  data: null;
  error: null;
}
interface PPC_theme_change extends PPC_message {
  type: "theme_change";
  success: true;
  data: {
    new_theme: string;
    old_theme: string;
    colorScheme: "dark" | "light";
  };
  error: null;
}
interface PPC_heartbeat_response extends PPC_message {
  type: "heartbeat_response";
  success: true;
  data: null;
  error: null;
}

interface PPC_set_tab_icon extends PPC_message {
  type: "set_tab_icon";
  success: true;
  data: {
    icon: ReactElement;
  };
  error: null;
}
interface PPC_set_tab_name extends PPC_message {
  type: "set_tab_name";
  success: true;
  data: {
    name: string;
  };
  error: null;
}
interface PPC_performance_load_finished extends PPC_message {
  type: "performance_load_finished";
  success: true;
  data: null;
  error: null;
}
interface PPC_performance_mark extends PPC_message {
  type: "performance_mark";
  success: true;
  data: {
    name: string;
    hint?: string;
  };
  error: null;
}

interface PPC_tab_requestFullscreen extends PPC_message {
  type: "requestFullscreen";
  success: true;
  data: {
    targetEl: string;
  };
  error: null;
}

interface PPC_message_init_successful extends PPC_message {
  type: "init";
  success: true;
  data: {
    tabDetails: TabInfo;
    css_path: string;
    current_theme: string;
  };
  error: null;
}

interface PPC_message_init_unsuccessful extends PPC_message {
  type: "init";
  success: false;
  data: null;
  error: ErrorI;
}
type PPC_message_init =
  | PPC_message_init_successful
  | PPC_message_init_unsuccessful;

export type PPC_messageType =
  | PPC_message_init
  | PPC_log
  | PPC_notification_add
  | PPC_notification_remove
  | PPC_notification_set
  | PPC_set_tab_name
  | PPC_tab_event
  | PPC_remove_tab_listener
  | PPC_tab_unsub_defer_resolve
  | PPC_tab_requestFullscreen
  | PPC_notificationType_set
  | PPC_tab_unsub_defer
  | PPC_heartbeat
  | PPC_add_tab_listener
  | PPC_set_tab_icon
  | PPC_data_await
  | PPC_performance_mark
  | PPC_performance_load_finished
  | PPC_tab_alert
  | PPC_data_response
  | PPC_theme_change
  | PPC_heartbeat_response;

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
type TabLogType = cLogStyleType | "test" | "system";

//* NOTE: This type was copied from multinite's tabManagerProvider.tsx
export type TabInfo =
  | TabInfo_content
  | TabInfo_loading
  | TabInfo_chat
  | TabInfo_public
  | TabInfo_profile
  | TabInfo_new_tab;

type ProceedDeferFnc = () => void;
type TabListenerDeferFunction = () => ProceedDeferFnc;

//* Copied from navReducer.tsx
interface TabListenerTEMPLATE {
  type: "close" | "focus" | "blur" | "moved" | "start";
  tabId: TabInfo["id"];
  callback:
    | (() => void)
    | ((event: { defer: TabListenerDeferFunction }) => void);
}

interface TabListenerClose extends TabListenerTEMPLATE {
  type: "close";
  callback: (event: { defer: TabListenerDeferFunction }) => void;
}
interface TabListenerFocus extends TabListenerTEMPLATE {
  type: "focus";
  callback: () => void;
}
interface TabListenerBlur extends TabListenerTEMPLATE {
  type: "blur";
  callback: () => void;
}
interface TabListenerMoved extends TabListenerTEMPLATE {
  type: "moved";
  callback: () => void;
}
interface TabListenerStart extends TabListenerTEMPLATE {
  type: "start";
  callback: () => void;
}

export type TabListener =
  | TabListenerClose
  | TabListenerFocus
  | TabListenerBlur
  | TabListenerMoved
  | TabListenerStart;

export type TabManagerLisenerUnsubscribe = () => void;

export type InitialTabManagerState = {
  tab: TabInfo | null;
  tabAlert: (alertProps: { body: ReactElement }) => Promise<void>;
  on: (
    event: "close" | "focus" | "blur" | "moved" | "start", //TODO: Add all the functionality of all the events.
    cb: TabListener["callback"]
  ) => TabManagerLisenerUnsubscribe;
  setTabName: (name: string) => void;
  setTabIcon: (icon: ReactElement) => void;
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
