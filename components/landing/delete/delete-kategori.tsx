"use client";

export function DeleteButtonKategori({ id }: { id: string }) {
  const handlePermanentDelete = async () => {
    // Peringatan ekstra karena ini tidak bisa dibatalkan!
    if (!confirm("⚠️ BAHAYA: Ini akan menghapus kategori DAN semua alat di dalamnya secara permanen. Lanjutkan?")) return;

    const res = await fetch(`/admin/management-kategori/${id}/delete`, {
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