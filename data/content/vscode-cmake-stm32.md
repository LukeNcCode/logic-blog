通过本文，你将快速完成 VSCode 中 STM32 开发环境的搭建与配置。

### 第一步：安装[cmake](https://cmake.org/download/),[git](https://git-scm.com/),[ninja](https://github.com/ninja-build/ninja/releases/v1.13.1),[gnu-toolchains-for-arm](https://gitlab.arm.com/tooling/gnu-toolchains-for-arm)，并设置ninja,arm交叉编译链的环境变量。
![示意图](images/vscode-cmake-stm32/1.png)

### 第二步：下载[本项目](https://github.com/LukeNcCode/vscode-cmake-stm32/archive/refs/heads/main.zip)并解压，将.vscode文件夹放置在STM32工程根目录下。
![示意图](images/vscode-cmake-stm32/2.png)

### 第三步：参考本项目中的README.md文件，依次修改文件中的对应参数。(elf文件名一般与STM32工程名字相同)

```json
// launch.json
{
    "version": "0.2.0",
    "configurations": [
    {
        "cwd": "${workspaceFolder}",
        "executable": "./build/Debug/test.elf",//实际elf文件
        "name": "Debug with JLink",
        "request": "launch",
        "type": "cortex-debug",
        "serverpath": "C:/Program Files/SEGGER/JLink_V810/JLinkGDBServerCL.exe",//实际JLinkGDBServerCL路径
        "device": "STM32F407ZG",//实际芯片型号
        "runToEntryPoint": "main",
        "showDevDebugOutput": "none",
        "servertype": "jlink",
        "interface": "swd",
    },
    ]
}

```
```json
//tasks.json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Build",
            "type": "shell",
            "command": "cmake",
            "args": [
                "--build",
                "${workspaceFolder}/build/Debug",
                "--config",
                "Debug",
                "--target",
                "all",
                "--",
                "-j4"
            ],
            "group": {
                "kind": "build",
                "isDefault": false
            },
            "problemMatcher": [
                "$gcc"
            ]
        },
        {
            "label": "Flash",
            "type": "shell",
            "command": "C:/Program Files/SEGGER/JLink_V810/JLink.exe",
            "args": [
                "-device","STM32F407ZG",
                "-if","SWD",
                "-speed","4000",
                "-autoconnect","1",
                "-CommanderScript","${workspaceFolder}/.vscode/flash.jlink"
            ],
            "group": {
                "kind": "test",
                "isDefault": true
            }
        }
    ]
}
```
```json
//flash.jlink
#替换真实.elf

loadfile ./build/Debug/test.elf

# 复位并运行程序
r
g

# 退出
exit
```

### 第四步：在vscode配置中加载本项目中的STM32.code-profile。
![示意图](images/vscode-cmake-stm32/3.png)
![示意图](images/vscode-cmake-stm32/4.png)

### 第五步：确保一切无误，重启Vscode并打开对应工程项目文件夹。左下角会出现 Build | Flash 按钮。
![示意图](images/vscode-cmake-stm32/5.png)

### 第六步：用jlink连接好板子插入电脑进行测试，Build | Flash | Debug 下均无报错证明开发环境一切正常。
![示意图](images/vscode-cmake-stm32/6.png)
![示意图](images/vscode-cmake-stm32/7.png)
![示意图](images/vscode-cmake-stm32/8.png)