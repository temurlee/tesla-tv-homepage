// 动态等比缩放脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const logo = document.querySelector('.logo');
    const mainTitle = document.querySelector('.main-title');
    const subtitle = document.querySelector('.subtitle');
    
    // 基准尺寸（1920x1080屏幕下的尺寸）
    const baseLogoWidth = 240;
    const baseMainTitleSize = 64; // 4rem = 64px
    const baseSubtitleSize = 16;  // 1rem = 16px
    
    // 基准比例关系
    const logoToTitleRatio = baseLogoWidth / baseMainTitleSize; // 3.75
    const logoToSubtitleRatio = baseLogoWidth / baseSubtitleSize; // 15
    
    // 动态缩放函数
    function updateScaling() {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const viewportArea = viewportWidth * viewportHeight;
        
        // 计算缩放因子（基于视口面积）
        const baseViewportArea = 1920 * 1080;
        let scaleFactor = Math.sqrt(viewportArea / baseViewportArea);
        
        // 限制缩放范围
        scaleFactor = Math.max(0.5, Math.min(scaleFactor, 2.0));
        
        // 应用缩放
        const newLogoWidth = Math.round(baseLogoWidth * scaleFactor);
        const newMainTitleSize = Math.round(baseMainTitleSize * scaleFactor);
        const newSubtitleSize = Math.round(baseSubtitleSize * scaleFactor);
        
        // 更新元素尺寸
        logo.style.width = newLogoWidth + 'px';
        mainTitle.style.fontSize = newMainTitleSize + 'px';
        subtitle.style.fontSize = newSubtitleSize + 'px';
        
        // 根据视口宽度调整
        if (viewportWidth < 480) {
            // 小屏幕特殊处理
            const smallScreenScale = 0.6;
            logo.style.width = Math.round(newLogoWidth * smallScreenScale) + 'px';
            mainTitle.style.fontSize = Math.round(newMainTitleSize * smallScreenScale) + 'px';
            subtitle.style.fontSize = Math.round(newSubtitleSize * smallScreenScale) + 'px';
        } else if (viewportWidth < 768) {
            // 中等屏幕
            const mediumScreenScale = 0.8;
            logo.style.width = Math.round(newLogoWidth * mediumScreenScale) + 'px';
            mainTitle.style.fontSize = Math.round(newMainTitleSize * mediumScreenScale) + 'px';
            subtitle.style.fontSize = Math.round(newSubtitleSize * mediumScreenScale) + 'px';
        } else if (viewportWidth > 2000) {
            // 超宽屏幕
            const wideScreenScale = 1.3;
            logo.style.width = Math.round(newLogoWidth * wideScreenScale) + 'px';
            mainTitle.style.fontSize = Math.round(newMainTitleSize * wideScreenScale) + 'px';
            subtitle.style.fontSize = Math.round(newSubtitleSize * wideScreenScale) + 'px';
        }
        
        // 根据视口高度调整
        if (viewportHeight < 600) {
            const shortScreenScale = 0.7;
            logo.style.width = Math.round(logo.offsetWidth * shortScreenScale) + 'px';
            mainTitle.style.fontSize = Math.round(parseFloat(getComputedStyle(mainTitle).fontSize) * shortScreenScale) + 'px';
            subtitle.style.fontSize = Math.round(parseFloat(getComputedStyle(subtitle).fontSize) * shortScreenScale) + 'px';
        }
        
        // 确保比例关系
        const currentLogoWidth = logo.offsetWidth;
        const currentMainTitleSize = parseFloat(getComputedStyle(mainTitle).fontSize);
        const currentSubtitleSize = parseFloat(getComputedStyle(subtitle).fontSize);
        
        // 验证并调整比例
        const actualLogoToTitleRatio = currentLogoWidth / currentMainTitleSize;
        const actualLogoToSubtitleRatio = currentLogoWidth / currentSubtitleSize;
        
        if (Math.abs(actualLogoToTitleRatio - logoToTitleRatio) > 0.1) {
            const adjustedTitleSize = currentLogoWidth / logoToTitleRatio;
            mainTitle.style.fontSize = adjustedTitleSize + 'px';
        }
        
        if (Math.abs(actualLogoToSubtitleRatio - logoToSubtitleRatio) > 0.1) {
            const adjustedSubtitleSize = currentLogoWidth / logoToSubtitleRatio;
            subtitle.style.fontSize = adjustedSubtitleSize + 'px';
        }
    }
    
    // 初始化缩放
    updateScaling();
    
    // 监听窗口大小变化
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateScaling, 100);
    });
    
    // 监听方向变化（移动设备）
    window.addEventListener('orientationchange', function() {
        setTimeout(updateScaling, 100);
    });
    
    // 监听CSS媒体查询变化
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        mediaQuery.addListener(updateScaling);
    }
    
    // 添加平滑过渡效果
    logo.style.transition = 'width 0.3s ease';
    mainTitle.style.transition = 'font-size 0.3s ease';
    subtitle.style.transition = 'font-size 0.3s ease';
    
    // 性能优化：使用requestAnimationFrame
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateScaling();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // 优化滚动性能
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // 添加调试信息（开发环境）
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('等比缩放脚本已加载');
        console.log('基准比例关系:', {
            logoToTitle: logoToTitleRatio,
            logoToSubtitle: logoToSubtitleRatio
        });
    }
});

// 添加CSS变量支持，用于更精确的缩放控制
document.documentElement.style.setProperty('--base-logo-width', '240px');
document.documentElement.style.setProperty('--base-title-size', '4rem');
document.documentElement.style.setProperty('--base-subtitle-size', '1rem');
