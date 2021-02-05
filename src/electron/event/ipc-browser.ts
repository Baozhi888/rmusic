import { IpcRenderer } from '@/electron/event/ipc-renderer'

export const asyncIpc = () => {
  return import('@/electron/event/ipc-renderer').then((v: IpcRenderer) => {
    return {
      sendAsyncIpcRendererEvent: v.sendAsyncIpcRendererEvent,
      sendSyncIpcRendererEvent: v.sendSyncIpcRendererEvent,
      getWindow: v.getWindow
    }
  })
}

export const importIpcOrigin = () => {
  return import('electron').then(v => v.ipcRenderer)
}

export const importShell = () => {
  return import('electron').then(v => v.shell)
}
