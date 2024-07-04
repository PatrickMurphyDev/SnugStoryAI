// Class for managing map controls, including panning and zooming
export default class MapControls {

  // Method to handle map panning
  static move(controls) {

    // Function to initiate panning on mouse press
    function mousePressed(e) {
      controls.viewPos.isDragging = true;
      controls.viewPos.prevX = e.clientX;
      controls.viewPos.prevY = e.clientY;
    }

    // Function to update the view position on mouse drag
    function mouseDragged(e) {
      const { prevX, prevY, isDragging } = controls.viewPos;
      if (!isDragging) return; // If not dragging, do nothing

      const pos = { x: e.clientX, y: e.clientY };
      const dx = pos.x - prevX; // Calculate change in x position
      const dy = pos.y - prevY; // Calculate change in y position

      if (prevX !== null && prevY !== null) {
        controls.view.x += dx; // Update view x position
        controls.view.y += dy; // Update view y position
        controls.viewPos.prevX = pos.x; // Update previous x position
        controls.viewPos.prevY = pos.y; // Update previous y position
      }
    }

    // Function to end panning on mouse release
    function mouseReleased() {
      controls.viewPos.isDragging = false;
      controls.viewPos.prevX = null;
      controls.viewPos.prevY = null;
    }

    // Return the functions to be used as event handlers
    return {
      mousePressed,
      mouseDragged,
      mouseReleased,
    };
  }

  // Method to handle map zooming
  static zoom(controls) {

    // Function to handle zooming based on mouse wheel events
    function worldZoom(e) {
      const { x, y, deltaY } = e;
      const direction = deltaY > 0 ? -1 : 1; // Determine zoom direction
      const factor = 0.05; // Zoom factor
      const zoom = 1 * direction * factor;

      // Calculate the mouse position relative to the view
      const wx = (x - controls.view.x) / (controls.pLib.width * controls.view.zoom);
      const wy = (y - controls.view.y) / (controls.pLib.height * controls.view.zoom);

      // Adjust the view position based on the zoom
      controls.view.x -= wx * controls.pLib.width * zoom;
      controls.view.y -= wy * controls.pLib.height * zoom;
      controls.view.zoom += zoom; // Update the zoom level
    }

    // Return the function to be used as an event handler
    return { worldZoom };
  }
}
