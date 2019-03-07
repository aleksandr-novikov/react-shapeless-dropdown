import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Dropdown extends Component {
    static propTypes = {
        button: PropTypes.any,
        closeOnScroll: PropTypes.bool,
        closeOnAction: PropTypes.bool,
        boxGap: PropTypes.number,
        boxHeight: PropTypes.number,
        boxPosition: PropTypes.string,
        focusRef: PropTypes.object,
        boxStyle: PropTypes.object,
        arrowStyle: PropTypes.object,
        crossStyle: PropTypes.object,
        onDropdownOpen: PropTypes.func,
        onDropdownClose: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            opened: false,
            dropdownBounds: {},
        };

        this.dropdown = React.createRef();
        this.box = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDropdownBounds);
        window.addEventListener('scroll', this.onScroll);

        this.updateDropdownBounds();
    }

    componentDidUpdate() {
        if (this.state.opened && this.props.focusRef && this.props.focusRef.current) {
            this.props.focusRef.current.focus();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDropdownBounds);
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = () => {
        if (this.props.closeOnScroll) {
            this.close();
        }

        this.updateDropdownBounds();
    };

    updateDropdownBounds = () => this.dropdown.current &&
        this.setState({
            dropdownBounds: this.dropdown.current.getBoundingClientRect()
        });

    handleKeyDown = ({key}) => this.props.closeOnAction &&
        (key === 'Enter' || key === 'Escape') &&
        this.close();

    handleClick = ({target}) => this.props.closeOnAction &&
        this.box.current &&
        !this.box.current.isEqualNode(target) &&
        this.close();

    open = () => !this.state.opened && this.setState({opened: true},
        () => this.props.onDropdownOpen());

    close = () => this.state.opened && this.setState({opened: false},
        () => this.props.onDropdownClose());

    toggleOpened = ({target}) => {
        if (this.dropdown.current && this.dropdown.current.contains(target)) {
            this.state.opened ? this.close() : this.open();
        }
    };

    renderContent = () => (
        <div tabIndex='0'
             onKeyDown={this.handleKeyDown}
             ref={this.box}
             style={boxStyle(this.props, this.state, this.dropdown)}>
            {this.props.children}
            <div onClick={this.close} style={crossStyle(this.props)}>
                &times;
            </div>
        </div>
    );

    render() {
        return (
            <div ref={this.dropdown}
                 onClick={this.handleClick}
                 style={{position: 'relative'}}>
                <div onClick={this.toggleOpened} style={{display: 'inline-block', cursor: 'pointer'}}>
                    {this.props.button}
                    {typeof this.props.button === 'string' && <i style={arrowStyle(this.props, this.state)}/>}
                </div>
                {this.state.opened && this.renderContent()}
            </div>
        );
    }
}

Dropdown.defaultProps = {
    button: 'Menu',
    boxGap: 10,
    closeOnScroll: true,
    closeOnAction: true,
    boxPosition: 'auto',
    boxHeight: 250,
    boxStyle: null,
    arrowStyle: null,
    crossStyle: null,
    focusRef: null,
    onDropdownOpen: () => {},
    onDropdownClose: () => {},
};

const boxPosition = (props, dropdown) => {
    const totalHeight = props.boxHeight + props.boxGap
        + dropdown.current.getBoundingClientRect().bottom;

    if (props.boxPosition !== 'auto') {
        return props.boxPosition;
    }

    if (totalHeight > window.innerHeight) {
        return 'top';
    }

    return 'bottom';
};

const boxStyle = (props, state, dropdown) => {
    const position = boxPosition(props, dropdown);
    const indent = `${state.dropdownBounds.height + props.boxGap}px`;
    return  {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        left: 0,
        width: `${state.dropdownBounds.width}px`,
        border: '1px solid #ccc',
        boxShadow: `0 0 10px 0 rgba(0, 0, 0, 0.2)`,
        borderRadius: '3px',
        maxHeight: `${props.boxHeight}px`,
        overflow: 'auto',
        zIndex: 8,
        outline: 'none',
        boxSizing: 'border-box',
        padding: 0,
        paddingTop: '34px',
        ...typeof props.children === 'string' && {padding: '34px 10px 10px 10px'},
        ...position === 'top' && {bottom: indent},
        ...position === 'bottom' && {top: indent},
        ...props.boxStyle
    }
};

const arrowStyle = (props, state) => ({
    border: 'solid #999',
    borderWidth: '0 2px 2px 0',
    display: 'inline-block',
    position: 'relative',
    padding: '3px',
    marginLeft: '6px',
    ...state.opened && {transform: 'rotate(-135deg)', top: '1px'},
    ...!state.opened && {transform: 'rotate(45deg)', top: '-3px'},
    ...props.arrowStyle
});

const crossStyle = (props) => ({
    position: 'absolute',
    right: '10px',
    top: '6px',
    color: "#999",
    fontWeight: 'bold',
    cursor: 'pointer',
    ...props.crossStyle
});

export default Dropdown;