<template>
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0" enable-background="0" xml:space="preserve" class="animation-item">
    
        <rect fill="#0f1b2e" width="3" height="100" transform="translate(0) rotate(180 3 50)">
        <animate
            attributeName="height"
            attributeType="XML"
            dur="1s"
            values="30; 100; 30"
            repeatCount="indefinite"/>
        </rect>
        <rect x="17" fill="#0f1b2e" width="3" height="100" transform="translate(0) rotate(180 20 50)">
            <animate
                attributeName="height"
                attributeType="XML"
                dur="1s"
                values="30; 100; 30"
                repeatCount="indefinite"
                begin="0.1s"/>
        </rect>
        <rect x="40" fill="#0f1b2e" width="3" height="100" transform="translate(0) rotate(180 40 50)">
            <animate
                attributeName="height"
                attributeType="XML"
                dur="1s"
                values="30; 100; 30"
                repeatCount="indefinite"
                begin="0.3s"/>
            </rect>
        <rect x="60" fill="#0f1b2e" width="3" height="100" transform="translate(0) rotate(180 58 50)">
            <animate
                attributeName="height"
                attributeType="XML"
                dur="1s"
                values="30; 100; 30"
                repeatCount="indefinite"
                begin="0.5s"/>
            </rect>
        <rect x="80" fill="#0f1b2e" width="3" height="100" transform="translate(0) rotate(180 76 50)">
            <animate
                attributeName="height"
                attributeType="XML"
                dur="1s"
                values="30; 100; 30"
                repeatCount="indefinite"
                begin="0.1s"/>
        </rect>
    </svg>
</template>

<style>
    .animation-item{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>