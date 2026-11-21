import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://ceicnklarilkytojtssy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Y0U7X4uhNk2sMUiHm1tlVQ_JwAO2SOj";
const TABLE_NAME = "store_sync";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

async function layIpHienTai() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "unknown";
  } catch {
    return "unknown";
  }
}

window.dongBoLenQTV = async function (eventType, payload = {}) {
  const ipAddress = await layIpHienTai();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{ event_type: eventType, payload, ip_address: ipAddress }])
    .select();

  if (error) {
    console.error("Lỗi gửi lên Supabase:", error.message);
    return null;
  }
  return data;
};
