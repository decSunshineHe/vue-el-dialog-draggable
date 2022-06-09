const VueDragDiaglog = {
  install(Vue, options) {
    Vue.directive("draggable", {
      bind(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector(".el-dialog__header");
        const dragDom = el.querySelector(".el-dialog");
        dialogHeaderEl.style.cursor = "move";

        const sty =
          dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        dialogHeaderEl.onmousedown = (e) => {
          // 鼠标按下，获得鼠标在盒子内的坐标（鼠标在页面的坐标 减去 对话框的坐标），计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft;
          const disY = e.clientY - dialogHeaderEl.offsetTop;

          const screenWidth = document.body.clientWidth; // body当前宽度
          const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

          const minDragDomLeft = dragDom.offsetLeft + 180;
          const maxDragDomLeft = screenWidth - dragDom.offsetLeft - 60;

          const minDragDomTop = dragDom.offsetTop;
          const maxDragDomTop = screenHeight - dragDom.offsetTop - 60;

          // 获取到的值带px 正则匹配替换
          let styL, styT;

          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (sty.left.includes("%")) {
            styL =
              +document.body.clientWidth * (+sty.left.replace(/\%/g, "") / 100);
            styT =
              +document.body.clientHeight * (+sty.top.replace(/\%/g, "") / 100);
          } else {
            styL = +sty.left.replace(/\px/g, "");
            styT = +sty.top.replace(/\px/g, "");
          }

          document.onmousemove = function (e) {
            // 鼠标移动，用鼠标在页面的坐标 减去 鼠标在盒子里的坐标，获得模态框的left和top值
            // 通过事件委托，计算移动的距离
            let left = e.clientX - disX;
            let top = e.clientY - disY;

            // 边界处理
            if (-left > minDragDomLeft) {
              left = -minDragDomLeft;
            } else if (left > maxDragDomLeft) {
              left = maxDragDomLeft;
            }

            if (-top > minDragDomTop) {
              top = -minDragDomTop;
            } else if (top > maxDragDomTop) {
              top = maxDragDomTop;
            }

            // 移动当前元素
            dragDom.style.left = `${left + styL}px`;
            dragDom.style.top = `${top + styT}px`;

            // 将此时的位置传出去
            // binding.value({x:e.pageX,y:e.pageY})
          };

          document.onmouseup = function (e) {
            //  鼠标弹起，移除鼠标移动事件
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
    });
  },
};

export default VueDragDiaglog;
