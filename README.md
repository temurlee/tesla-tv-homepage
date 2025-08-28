# Tesla TV 等比缩放系统

## 概述

这是一个专为Tesla车机系统设计的响应式等比缩放系统，确保logo、主标题和副标题在不同屏幕尺寸下保持完美的视觉比例关系。

## 设计原理

### 基准比例关系

在1920x1080标准屏幕下，三个核心元素的比例关系为：

- **Logo宽度**: 240px
- **主标题字体**: 64px (4rem)
- **副标题字体**: 16px (1rem)

**比例关系**:
- Logo : 主标题 = 240 : 64 = **3.75 : 1**
- Logo : 副标题 = 240 : 16 = **15 : 1**
- 主标题 : 副标题 = 64 : 16 = **4 : 1**

### 等比缩放算法

系统使用以下算法确保比例关系的一致性：

```javascript
// 基于视口面积的缩放因子
const scaleFactor = Math.sqrt(viewportArea / baseViewportArea);

// 应用缩放
const newLogoWidth = baseLogoWidth * scaleFactor;
const newMainTitleSize = baseMainTitleSize * scaleFactor;
const newSubtitleSize = baseSubtitleSize * scaleFactor;
```

## 技术实现

### CSS变量系统

```css
:root {
    --base-logo-width: 240px;
    --base-title-size: 4rem;
    --base-subtitle-size: 1rem;
    --logo-title-ratio: 3.75;
    --logo-subtitle-ratio: 15;
}
```

### JavaScript动态缩放

- **实时响应**: 监听窗口大小变化、方向变化
- **性能优化**: 使用requestAnimationFrame和防抖处理
- **比例验证**: 实时验证并调整比例关系
- **平滑过渡**: CSS transition实现平滑缩放效果

## 响应式断点

### 宽度断点
- **超宽屏幕** (>2000px): 1.3倍缩放
- **标准屏幕** (768px-2000px): 1.0倍缩放
- **中等屏幕** (480px-768px): 0.8倍缩放
- **小屏幕** (<480px): 0.6倍缩放

### 高度断点
- **标准高度** (>800px): 1.0倍缩放
- **中等高度** (600px-800px): 0.9倍缩放
- **短屏幕** (400px-600px): 0.7倍缩放
- **超短屏幕** (<400px): 0.6倍缩放

## 使用场景

### Tesla车机系统
- 支持不同分辨率的车机屏幕
- 适应横屏和竖屏模式
- 优化触摸操作体验

### 多设备兼容
- 桌面浏览器
- 移动设备
- 平板电脑
- 超宽显示器

## 性能特性

- **防抖处理**: 避免频繁的缩放计算
- **requestAnimationFrame**: 优化动画性能
- **CSS硬件加速**: 使用transform和opacity
- **内存优化**: 避免内存泄漏

## 调试信息

在开发环境中，控制台会显示：

```javascript
等比缩放脚本已加载
基准比例关系: {
    logoToTitle: 3.75,
    logoToSubtitle: 15
}
```

## 自定义配置

可以通过修改CSS变量来调整基准尺寸：

```css
:root {
    --base-logo-width: 300px;    /* 调整logo基准宽度 */
    --base-title-size: 5rem;     /* 调整主标题基准大小 */
    --base-subtitle-size: 1.2rem; /* 调整副标题基准大小 */
}
```

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- 支持CSS变量和现代JavaScript特性

## 维护说明

1. **比例关系**: 修改基准尺寸时需同步更新比例变量
2. **断点调整**: 根据实际使用情况调整响应式断点
3. **性能监控**: 关注缩放计算的性能表现
4. **视觉测试**: 在不同设备上测试缩放效果

## 更新日志

- **v1.0**: 初始版本，实现基础等比缩放
- **v1.1**: 添加CSS变量支持和性能优化
- **v1.2**: 完善响应式断点和触摸优化
