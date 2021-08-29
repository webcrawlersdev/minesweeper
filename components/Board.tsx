import { useEffect } from "react";
import { useAtom } from "jotai";

import Cell from "../components/Cell";
import { dugCellsNumAtom } from "../lib/store";

export default function Board({
  board,
  setBoard,
  dugCellsRef,
}: {
  board: any[];
  setBoard: any;
  dugCellsRef: React.MutableRefObject<any[]>;
}) {
  const [dugCellsNum] = useAtom(dugCellsNumAtom);

  useEffect(() => {
    console.log(dugCellsRef.current.length, dugCellsNum);
  }, [dugCellsNum]);

  return (
    <section className="flex flex-col gap-1">
      {board.map((rows, r) => {
        return (
          <div className="flex h-5 md:h-10 gap-1" key={`${r}`}>
            {rows.map((item, c) => {
              return (
                <Cell
                  board={board}
                  setBoard={setBoard}
                  key={`${r}-${c}`}
                  item={item}
                  row={r}
                  col={c}
                  dugCellsRef={dugCellsRef}
                />
              );
            })}
          </div>
        );
      })}
    </section>
  );
}
