# react-shapeless-dropdown

React dropdown component that can be opened and closed by clicking on an adjustable via props button. 
Dropdown can show any kind of text or another component. 

![Screenshot](/screen.png)

## Installation
```
npm install react-shapeless-dropdown
```

## API

| Property        | Type     | Default  | Description                                                                           |   |
|-----------------|----------|----------|---------------------------------------------------------------------------------------|---|
| button          | any      | 'Menu'   | "Toggle" button text or component. Always visible.                                           |   |
| closeOnScroll   | boolean  | true     | When true, scrolling will close the dropdown box.                                     |   |
| closeOnAction   | boolean  | true     | When true, click on nested component or keyboard "Enter" will close the dropdown box. |   |
| boxGap          | number   | 10       | Gap between "toggle" element and dropdown box.                                        |   |
| boxHeight       | number   | 250      | Limits dropdown box height.                                                           |   |
| boxPosition     | string   | 'auto'   | Can be "auto", "top" or "bottom". "auto" adjusts dropdown box to fit on the page.     |   |
| onDropdownOpen  | function | () =>{}  | Fires when user opens dropdown.                                                       |   |
| onDropdownClose | function | () => {} | Fires when user closes dropdown.                                                      |   |
| focusRef        | object   | null     | Reference to the element that should be focused when dropdown is opened.              |   |
| boxStyle        | object   | null     | Merged with dropdown box style.                                                         |   |
| arrowStyle      | object   | null     | Merged with up-down arrow style.                                                        |   |
| crossStyle      | object   | null     | Merged with closing cross style.                                                        |   |

## Usage
```jsx
import React, {Component} from 'react';
import {Dropdown} from 'react-shapeless-dropdown';

export default class App extends Component {
    render() {
        const button = ({text}) => (<div>{`>>${text}<<`}</div>);
        return (
            <Dropdown button={button({text: 'Menu'})}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Dropdown>
        );
    }
}
```

## License

Copyright (c) 2019 Aleksandr Novikov. [License](./LICENSE).