import { Component, Prop, State, Event, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * @slot - Default slot for custom dropzone content.
 *
 * @part dropzone - The dropzone area.
 * @part label - The label text.
 * @part input - The hidden file input.
 */
@Component({
  tag: 'ts-file-upload',
  styleUrl: 'file-upload.css',
  shadow: true,
})
export class TsFileUpload {
  @Element() hostEl!: HTMLElement;

  private fileInputEl?: HTMLInputElement;

  /** Accepted file types (e.g. '.jpg,.png'). */
  @Prop() accept?: string;

  /** Whether multiple files can be selected. */
  @Prop() multiple = false;

  /** Maximum file size in bytes. */
  @Prop() maxSize?: number;

  /** Whether the file upload is disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Label text for the dropzone. */
  @Prop() label = 'Drop files here or click to upload';

  /** Form field name. */
  @Prop() name?: string;

  /** Emitted when files are selected or dropped. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ files: File[] }>;

  /** Whether a drag operation is over the dropzone. */
  @State() isDragOver = false;

  private handleClick = (): void => {
    if (this.disabled) return;
    this.fileInputEl?.click();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.fileInputEl?.click();
    }
  };

  private handleFileChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = this.validateFiles(Array.from(input.files));
      if (files.length > 0) {
        this.tsChange.emit({ files });
      }
    }
    // Reset input so the same file can be selected again
    if (this.fileInputEl) {
      this.fileInputEl.value = '';
    }
  };

  private handleDragOver = (event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    if (!this.disabled) {
      this.isDragOver = true;
    }
  };

  private handleDragLeave = (event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  };

  private handleDrop = (event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    if (this.disabled) return;

    const droppedFiles = event.dataTransfer?.files;
    if (droppedFiles) {
      const files = this.validateFiles(Array.from(droppedFiles));
      if (files.length > 0) {
        this.tsChange.emit({ files });
      }
    }
  };

  private validateFiles(files: File[]): File[] {
    let validFiles = files;

    // Filter by accepted types
    if (this.accept) {
      const acceptedTypes = this.accept.split(',').map((t) => t.trim().toLowerCase());
      validFiles = validFiles.filter((file) => {
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        const mime = file.type.toLowerCase();
        return acceptedTypes.some(
          (accepted) =>
            accepted === ext ||
            accepted === mime ||
            (accepted.endsWith('/*') && mime.startsWith(accepted.replace('/*', '/'))),
        );
      });
    }

    // Filter by max size
    if (this.maxSize) {
      validFiles = validFiles.filter((file) => file.size <= this.maxSize!);
    }

    // If not multiple, take only the first
    if (!this.multiple && validFiles.length > 1) {
      validFiles = [validFiles[0]];
    }

    return validFiles;
  }

  render() {
    return (
      <Host
        class={{
          'ts-file-upload': true,
          'ts-file-upload--drag-over': this.isDragOver,
          'ts-file-upload--disabled': this.disabled,
        }}
      >
        <div
          class={{
            'file-upload__dropzone': true,
            'file-upload__dropzone--drag-over': this.isDragOver,
          }}
          part="dropzone"
          role="button"
          tabindex={this.disabled ? -1 : 0}
          aria-disabled={this.disabled ? 'true' : undefined}
          aria-label={this.label}
          onClick={this.handleClick}
          onKeyDown={this.handleKeydown}
          onDragOver={this.handleDragOver}
          onDragLeave={this.handleDragLeave}
          onDrop={this.handleDrop}
        >
          <span class="file-upload__label" part="label">
            <slot>{this.label}</slot>
          </span>

          <input
            ref={(el) => (this.fileInputEl = el)}
            class="file-upload__input"
            part="input"
            type="file"
            name={this.name}
            accept={this.accept}
            multiple={this.multiple}
            disabled={this.disabled}
            tabindex={-1}
            aria-hidden="true"
            onChange={this.handleFileChange}
          />
        </div>
      </Host>
    );
  }
}
