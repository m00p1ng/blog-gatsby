declare module "disqus-react" {
  export class DiscussionEmbed extends React.Component<{
    shortname: string,
    config: {
      url?: string,
      identifier?: string,
      title?: string,
    },
  }, {}> { }
}

declare module "react-headroom" {
  export interface HeadroomProps {
    className?: string
    parent?: () => void
    children: any
    disableInlineStyles?: boolean
    disable?: boolean
    upTolerance?: number
    downTolerance?: number
    onPin?: () => void
    onUnpin?: () => void
    onUnfix?: () => void
    wrapperStyle?: object
    pinStart?: number
    style?: object
    calcHeightOnResize?: boolean
  }

  export default class Headroom extends React.Component<HeadroomProps> { }
}

declare module "react-reveal/Flip" {
  export interface FlipProps {
    right?: boolean
  }

  export default class Flip extends React.Component<FlipProps> { }
}

declare module "react-reveal/Zoom" {
  export default class Zoom extends React.Component { }
}