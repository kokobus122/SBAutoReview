import { FC } from "react";
import skinview3d from "skinview3d";

interface SkinViewerProps {
    username: string;
}

const SkinViewer: FC<SkinViewerProps> = ({username}: SkinViewerProps) => {
  let skinViewer = new skinview3d.SkinViewer({
    canvas: document.getElementById("skin_container") as HTMLCanvasElement,
    width: 300,
    height: 400,
    skin: "img/skin.png",
  });
  return (
    <div>
      SkinViewer
      <canvas id="skin_container"></canvas>
    </div>
  );
};

export default SkinViewer;
