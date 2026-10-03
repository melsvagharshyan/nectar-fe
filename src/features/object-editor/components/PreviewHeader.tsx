import { FiEye } from "react-icons/fi";

export function PreviewHeader({ hasPhotos }: { hasPhotos: boolean }) {
  return (
    <div className="w-520 max-w-full">
      <span className="flex items-center gap-6 text-[11px] font-semibold tracking-[0.6px] text-accent-text uppercase">
        <FiEye className="size-13" />
        Предпросмотр
      </span>
      <h3 className="mt-4 text-[18px] font-bold tracking-[-0.3px] text-ink">
        Так объект увидят брокеры
      </h3>
      <p className="mt-2 text-[13px] text-muted">
        {hasPhotos
          ? "Карточка обновляется по мере заполнения формы"
          : "Добавьте фото в разделе «Медиа и фото» — первое станет обложкой"}
      </p>
    </div>
  );
}
