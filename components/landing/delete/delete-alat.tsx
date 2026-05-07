"use client";

export function DeleteButtonAlat({ id }: { id: string }) {
  const handlePermanentDelete = async () => {
    // Peringatan ekstra karena ini tidak bisa dibatalkan!
    if (!confirm("⚠️ BAHAYA: Ini akan menghapus Alat DAN semua kegiatan di dalamnya secara permanen. Lanjutkan?")) return;

    const res = await fetch(`/admin/management-alat/${id}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.reload();
    } else {
      alert("Gagal menghapus permanen.");
    }
  };

  return (
    <button 
      onClick={handlePermanentDelete} 
      className="text-dark py-1 rounded "
    >
      Hapus
    </button>
  );
}