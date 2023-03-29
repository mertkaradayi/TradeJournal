(function() {
    const script = document.createElement("script");
    script.src =
        "https://cdn.jsdelivr.net/npm/darkmode-js@1.5.7/lib/darkmode-js.min.js";
    script.onload = function() {
        const options = {
            bottom: "32px", // default: '32px'
            right: "32px", // default: '32px'
            left: "unset", // default: 'unset'
            time: "0.5s", // default: '0.3s'
            mixColor: "#fff", // default: '#fff'
            backgroundColor: "#fff", // default: '#fff'
            buttonColorDark: "#100f2c", // default: '#100f2c'
            buttonColorLight: "#fff", // default: '#fff'
            saveInCookies: true, // default: true,
            label: "🌓", // default: ''
            autoMatchOsTheme: true, // default: true
        };
        new Darkmode(options).showWidget();
    };
    document.body.appendChild(script);
})();