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