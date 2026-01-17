import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  nodeType: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class SafeNodeWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error(`Error in ${this.props.nodeType}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg">
          <div className="text-red-800 font-bold text-sm mb-1">
            Error: {this.props.nodeType}
          </div>
          <div className="text-red-600 text-xs">
            {this.state.error?.message || 'Unknown error'}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}