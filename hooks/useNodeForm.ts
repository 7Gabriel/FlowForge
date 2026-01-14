import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

interface UseNodeFormOptions<T> {
  initialData: T;
  onUpdate: (data: Partial<T>) => void;
  debounceMs?: number;
}

export function useNodeForm<T extends Record<string, any>>({
  initialData,
  onUpdate,
  debounceMs = 300,
}: UseNodeFormOptions<T>) {
  const [formData, setFormData] = useState<T>(initialData);

  // Sincronizar quando initialData mudar (troca de node selecionado)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  // Criar versão debounced do onUpdate
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((data: Partial<T>) => {
      onUpdate(data);
    }, debounceMs),
    [onUpdate, debounceMs]
  );

  // Handler para atualizar campo
  const updateField = useCallback(
    (field: keyof T, value: any) => {
      setFormData((prev) => {
        const updated = { ...prev, [field]: value };
        debouncedUpdate({ [field]: value } as Partial<T>);
        return updated;
      });
    },
    [debouncedUpdate]
  );

  return {
    formData,
    updateField,
    setFormData,
  };
}