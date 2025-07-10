import { EditorFormProps } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { certificateSchema, CertificateValues } from "@/lib/validation";
import { useEffect } from "react";
import { GripHorizontal } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

export default function CertificateForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<CertificateValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      certificates: resumeData.certificates || [],
    },
  });

  useEffect(() => {
    // Get the current unsubscribe function
    const subscription = form.watch((values) => {
      // Update your resume preview state here
      // Example: updateResumePreview(values);
      console.log("Updating preview with:", values);
      setResumeData({
        ...resumeData,
        certificates:
          values.certificates?.filter((cert) => cert !== undefined) || [],
      });
    });
    // Cleanup function
    return () => subscription.unsubscribe();
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "certificates",
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Certificate</h2>
        <p className="text-sm text-muted-foreground">
          Add as many certificate as you have
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={fields}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field, index) => (
                <CertificateItem
                  id={field.id}
                  key={field.id}
                  index={index}
                  form={form}
                  remove={remove}
                />
              ))}
            </SortableContext>
          </DndContext>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  issuer: "",
                  issueDate: "",
                  credentialId: "",
                  credentialUrl: "",
                  description: "",
                })
              }
            >
              Add Certificate
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface CertificateItemProps {
  id: string;
  form: UseFormReturn<CertificateValues>;
  index: number;
  remove: (index: number) => void;
}

function CertificateItem({ id, form, index, remove }: CertificateItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({ id });

  return (
    <div
      className="space-y-6 border rounded-md bg-background p-3"
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        cursor: isSorting ? "grabbing" : "grab",
      }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Certificate {index + 1}</span>
        <GripHorizontal
          className="size-5 cursor-grab text-muted-foreground focus:outline-none"
          {...attributes}
          {...listeners}
        />
      </div>
      <FormField
        control={form.control}
        name={`certificates.${index}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., Certificate Title" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`certificates.${index}.issuer`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Issuer</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., ABC University" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`certificates.${index}.issueDate`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Issued Date</FormLabel>
            <FormControl>
              <Input {...field} type="date" value={field.value?.slice(0, 10)} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`certificates.${index}.credentialId`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Credential ID</FormLabel>
            <FormControl>
              <Input {...field} placeholder="e.g., 1234567890" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`certificates.${index}.credentialUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Credential URL</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="url"
                placeholder="e.g., https://example.com/credential"
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`certificates.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="e.g., Describe your certificate"
                className="h-32"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Button variant="destructive" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
}
