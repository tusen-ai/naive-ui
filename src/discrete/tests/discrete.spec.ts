import { createDiscreteApi } from '../index'

describe('discrete', () => {
  it('should work with import on demand', () => {
    expect(createDiscreteApi).toBeDefined()
  })

  it('should create discrete api with message', () => {
    const { message, unmount } = createDiscreteApi(['message'])
    expect(message).toBeDefined()
    expect(typeof message.info).toBe('function')
    expect(typeof message.success).toBe('function')
    expect(typeof message.warning).toBe('function')
    expect(typeof message.error).toBe('function')
    expect(typeof message.loading).toBe('function')
    unmount()
  })

  it('should create discrete api with notification', () => {
    const { notification, unmount } = createDiscreteApi(['notification'])
    expect(notification).toBeDefined()
    expect(typeof notification.info).toBe('function')
    expect(typeof notification.success).toBe('function')
    expect(typeof notification.warning).toBe('function')
    expect(typeof notification.error).toBe('function')
    unmount()
  })

  it('should create discrete api with dialog', () => {
    const { dialog, unmount } = createDiscreteApi(['dialog'])
    expect(dialog).toBeDefined()
    expect(typeof dialog.info).toBe('function')
    expect(typeof dialog.success).toBe('function')
    expect(typeof dialog.warning).toBe('function')
    expect(typeof dialog.error).toBe('function')
    unmount()
  })

  it('should create discrete api with loadingBar', () => {
    const { loadingBar, unmount } = createDiscreteApi(['loadingBar'])
    expect(loadingBar).toBeDefined()
    expect(typeof loadingBar.start).toBe('function')
    expect(typeof loadingBar.finish).toBe('function')
    expect(typeof loadingBar.error).toBe('function')
    unmount()
  })

  it('should create discrete api with modal', () => {
    const { modal, unmount } = createDiscreteApi(['modal'])
    expect(modal).toBeDefined()
    expect(typeof modal.create).toBe('function')
    unmount()
  })

  it('should create discrete api with multiple providers', () => {
    const { message, notification, dialog, loadingBar, unmount } = createDiscreteApi([
      'message',
      'notification',
      'dialog',
      'loadingBar'
    ])
    expect(message).toBeDefined()
    expect(notification).toBeDefined()
    expect(dialog).toBeDefined()
    expect(loadingBar).toBeDefined()
    unmount()
  })

  it('should work with configProviderProps', () => {
    const { message, unmount } = createDiscreteApi(['message'], {
      configProviderProps: {
        themeOverrides: {
          common: {
            primaryColor: '#1890ff'
          }
        }
      }
    })
    expect(message).toBeDefined()
    unmount()
  })

  it('should work with messageProviderProps', () => {
    const { message, unmount } = createDiscreteApi(['message'], {
      messageProviderProps: {
        max: 5,
        duration: 3000
      }
    })
    expect(message).toBeDefined()
    unmount()
  })

  it('should work with dialogProviderProps', () => {
    const { dialog, unmount } = createDiscreteApi(['dialog'], {
      dialogProviderProps: {
        placement: 'center'
      }
    })
    expect(dialog).toBeDefined()
    unmount()
  })

  it('should work with notificationProviderProps', () => {
    const { notification, unmount } = createDiscreteApi(['notification'], {
      notificationProviderProps: {
        max: 3,
        placement: 'top-right'
      }
    })
    expect(notification).toBeDefined()
    unmount()
  })

  it('should return app instance', () => {
    const { app, unmount } = createDiscreteApi(['message'])
    expect(app).toBeDefined()
    expect(typeof app.unmount).toBe('function')
    unmount()
  })

  it('should handle unmount correctly', () => {
    const { unmount } = createDiscreteApi(['message'])
    unmount()
    expect(() => unmount()).not.toThrow()
  })
})
