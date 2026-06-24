import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export function usePackagesData() {
  const [packages, setPackages] = useState([]);
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    const { data: packages } = await supabase
      .from("packages")
      .select("*")
      .order("created_at");

    const { data: addons } = await supabase
      .from("addons")
      .select("*")
      .order("created_at");

    setPackages(packages || []);
    setAddons(addons || []);

    setLoading(false);
  }

  return { packages, addons, loading };
}
