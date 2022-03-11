import styled from 'styled-components';

export const Popup = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: center;
    align-items: center;
`

export const InnerPopup = styled.div`
    position: relative;
    padding: 32px;
    width: 100%;
    max-width: 640px;
    background-color: white;
`

export const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
`