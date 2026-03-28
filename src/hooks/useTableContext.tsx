import  { tableContext } from "@/TableContext";
import { useContext } from "react";



export function useTableContext() {
    const ctx = useContext(tableContext);
    if (!ctx) {
      throw new Error('useTableContext must be used within TableProvider');
    }
    return ctx;
}