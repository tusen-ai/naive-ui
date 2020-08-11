import { cTB, c, cB, cNotM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const {
      backgroundColor
    } = props.$local
    return cTB('modal-content', [
      cB('card', {
        raw: `
          background-color: ${backgroundColor};
        `
      }),
      cB('confirm', {
        raw: `
          width: 446px;
          max-width: calc(100vw - 32px);
        `
      })
    ])
  },
  ({ props }) => {
    const {
      transformDebounceScale
    } = props.$base
    return [
      cB('modal-container', {
        raw: `
          position: fixed;
          left: 0;
          top: 0;
          height: 0;
          width: 0;
          display: flex;
        `
      }),
      cB('modal-overlay', {
        raw: `
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, .4);
        `
      }, [
        c(`&&-transition-enter-active`, {
          raw: `
            transition: background-color .3s cubic-bezier(0.0, 0.0, 0.2, 1);
          `
        }),
        c(`&&-transition-leave-active`, {
          raw: `
            transition: background-color .3s cubic-bezier(0.0, 0.0, 0.2, 1);
          `
        }),
        c(`&&-transition-enter, &&-transition-leave-to`, {
          raw: `
            background-color: rgba(0, 0, 0, 0);
          `
        })
      ]),
      cB('modal-content', {
        raw: `
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          overflow: visible;
        `
      }, [
        c('& >', [
          cB('scrollbar', [
            c('& >', [
              cB('scrollbar-container', [
                c('& >', [
                  cB('scrollbar-content', {
                    raw: `
                      min-height: 100%;
                      display: flex;
                    `
                  })
                ])
              ])
            ])
          ])
        ]),
        cNotM('active', {
          raw: `
            visibility: hidden;
          `
        })
      ]),
      cB('modal-content-slot', {
        raw: `
          position: relative;
        `
      }, [
        c(`&&-transition-enter-active`, {
          raw: `
            opacity: 1;
            transition: opacity .3s cubic-bezier(.4, 0, .2, 1), transform .3s cubic-bezier(0.0, 0.0, 0.2, 1);
            transform: ${transformDebounceScale};
          `
        }),
        c(`&&-transition-leave-active`, {
          raw: `
            opacity: 1;
            transition: opacity .3s cubic-bezier(.4, 0, .2, 1), transform .3s cubic-bezier(0.4, 0.0, 1, 1);
            transform:  ${transformDebounceScale};
          `
        }),
        c(`&&-transition-enter, &&-transition-leave-to`, {
          raw: `
            opacity: 0;
            transform: scale(.5);
          `
        })
      ])
    ]
  }
])
