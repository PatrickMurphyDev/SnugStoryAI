
export default class MapControls {
    static move(controls) {
      function mousePressed(e) {
        controls.viewPos.isDragging = true;
        controls.viewPos.prevX = e.clientX;
        controls.viewPos.prevY = e.clientY;
      }
  
      function mouseDragged(e) {
        const { prevX, prevY, isDragging } = controls.viewPos;
        if (!isDragging) return;
  
        const pos = { x: e.clientX, y: e.clientY };
        const dx = pos.x - prevX;
        const dy = pos.y - prevY;
  
        if (prevX || prevY) {
          controls.view.x += dx;
          controls.view.y += dy;
          controls.viewPos.prevX = pos.x;
          controls.viewPos.prevY = pos.y;
        }
      }
  
      function mouseReleased() {
        controls.viewPos.isDragging = false;
        controls.viewPos.prevX = null;
        controls.viewPos.prevY = null;
      }
  
      return {
        mousePressed,
        mouseDragged,
        mouseReleased,
      };
    }
  
    static zoom(controls) {
      function worldZoom(e) {
        const { x, y, deltaY } = e;
        const direction = deltaY > 0 ? -1 : 1;
        const factor = 0.05;
        const zoom = 1 * direction * factor;
  
        const wx = (x - controls.view.x) / (controls.pLib.width * controls.view.zoom);
        const wy = (y - controls.view.y) / (controls.pLib.height * controls.view.zoom);
  
        controls.view.x -= wx * controls.pLib.width * zoom;
        controls.view.y -= wy * controls.pLib.height * zoom;
        controls.view.zoom += zoom;
      }
  
      return { worldZoom };
    }
  }