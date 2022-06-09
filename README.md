# Vue Drag Popover

base vue and element-ui support el-dialog to drag

### Install

```
npm install vue-el-dialog-draggable
```

### Usage

**main.js**

```javascript
import Vue from "vue";
import VueDragDiaglog from "vue-el-dialog-draggable";

Vue.use(VueDragDiaglog);
```

**component**

```html
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  v-draggable
  :before-close="handleClose"
>
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
```
