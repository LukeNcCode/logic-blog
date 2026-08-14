window.__BLOG_CONTENT = window.__BLOG_CONTENT || {};
window.__BLOG_CONTENT["register-year"] = {
    "id":  "register-year",
    "content":  "最初拿到开发板那天，点亮第一个 LED 用了整整一个下午。现在回头看，那一下午其实什么都没学会——我只是在抄示例代码。\n\n直到某天我翻开数据手册，看到那一串寄存器地址。GPIOA-\u003eBSRR 写 1 置位、写 0 清零，那一刻我突然意识到：所谓\"控制硬件\"，本质就是往内存里的特定地址写数。\n\n看完寄存器后我写的第一段正经代码长这样：\n\n```c\n#include \"stm32f1xx.h\"\n\nvoid led_init(void) {\n    RCC-\u003eAPB2ENR |= RCC_APB2ENR_IOPCEN;  // 使能 GPIOC 时钟\n    GPIOC-\u003eCRH \u0026= ~GPIO_CRH_CNF13;       // PC13 配置为推挽输出\n    GPIOC-\u003eCRH |= GPIO_CRH_MODE13_1;\n}\n\nint main(void) {\n    led_init();\n    while (1) {\n        GPIOC-\u003eODR ^= GPIO_ODR_ODR13;    // 翻转 LED\n        for (volatile int i = 0; i \u003c 500000; i++);  // 简单延时\n    }\n}\n```\n\n从那以后我不再满足于 HAL 库封装好的函数。每学一个外设，我就去手册里找它对应的寄存器，自己写一遍初始化。速度慢了很多，但每一次都扎实。\n\n这一年烧过三块板子，调过无数个深夜的 bug，但当我第一次不用参考代码、纯靠寄存器配置让 PWM 输出呼吸灯时，那种确定性是无可替代的。"
};
