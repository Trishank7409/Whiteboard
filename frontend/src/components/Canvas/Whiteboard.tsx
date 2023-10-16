

import React, { useEffect, RefObject, useState, useLayoutEffect } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

interface WhiteboardProps {
  canvasRef: RefObject<HTMLCanvasElement>;

  ctxRef: RefObject<CanvasRenderingContext2D | null >;
  element: any[];
  setElement: React.Dispatch<React.SetStateAction<any[]>>;
  tool: string;
  setTool: React.Dispatch<React.SetStateAction<string>>;
  color:string
  user:any
}

const Whiteboard: React.FC<WhiteboardProps> = ({
  canvasRef,
  ctxRef,
  element,
  setElement,
  tool,
  setTool,
  color,
  user
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  let roughCanvas: rough.RoughCanvas | null = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx.strokeStyle=color;
    ctx.lineWidth=2;
    ctx.lineCap='round';
    if (ctx) {
      ctxRef.current = ctx;
    }
  }, [//canvasRef, ctxRef
]);

  useEffect(()=>{
    ctxRef.current.strokeStyle=color
  },[color])

  useLayoutEffect(() => {
    if (canvasRef.current) {
      roughCanvas = rough.canvas(canvasRef.current);

      if(element.length>0){
        ctxRef.current?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
      element.forEach((elem: any) => {
        if(elem.type=='Rectangle'){
          roughCanvas.draw(
            roughGenerator.rectangle(
              elem.offsetX,
              elem.offsetY,
              elem.width,
              elem.height,
              {
                stroke:elem.stroke,
                strokeWidth:5,
                roughness:0
              }
            )
          )
        }
        else if (elem.type === "pencil") {
          roughCanvas.linearPath(elem.path,    
             {
            stroke:elem.stroke,
            strokeWidth:5,
            roughness:0
          }
          )
     
          ;
        } else if (elem.type === "Line") {
          roughCanvas.line(
            elem.offsetX,
            elem.offsetY,
            elem.width,
            elem.height,
             {
              stroke:elem.stroke,
              strokeWidth:5,
              roughness:0
            } 
          );
        }
      });
    }
  }, [element, canvasRef]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (tool === "pencil") {
      setElement((prev) => [
        ...prev,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    } else if (tool === "Line") {
      setElement((prev) => [
        ...prev,
        {
          type: "Line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        },
      ]);
    }
    else if(tool=='Rectangle'){
      setElement((prev) => [
        ...prev,
        {
          type: "Rectangle",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
        },
      ]);
    }

    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      if (tool === "pencil") {
        const { path } = element[element.length - 1];
        const newPath = [...path, [offsetX, offsetY]];

        setElement((prev: any) =>
          prev.map((ele: any, index: number) => {
            if (index === element.length - 1) {
              return {
                ...ele,
                path: newPath,
              };
            } else {
              return ele;
            }
          })
        );
      } else if (tool === "Line") {
        setElement((prev: any) =>
          prev.map((ele: any, index: number) => {
            if (index === element.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      }
      else if (tool === "Rectangle") {
        setElement((prev: any) =>
          prev.map((ele: any, index: number) => {
            if (index === element.length - 1) {
              return {
                ...ele,
                width: offsetX-ele.offsetX,
                height: offsetY-ele.offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      }
    }
  };


  if(user?.presenter){
    return(
      <div className="w-75 p-3 mx-auto bg-secondary" style={{ height: "500px" }}>
         <img src="" alt="Real Time whiteboard image" className="w-100 h-100" />
      </div>
    )
  }

  return (
    <div className="pb-5">
      <div className="w-75 p-3 mx-auto bg-secondary" style={{ height: "500px" }}>
        <canvas
          ref={canvasRef}
          width={1100}
          height={465}
          style={{ backgroundColor: "white" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      </div>
    </div>
  );
};

export default Whiteboard;
