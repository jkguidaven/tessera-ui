import { Component, Prop, State, Event, h, Host, Element } from '@stencil/core';
import type { EventEmitter } from '@stencil/core';

/**
 * @slot - Default slot for custom dropzone content.
 *
 * @part dropzone - The dropzone area.
 * @part label - The label text.
 * @part input - The hidden file input.
 * @part file-list - The file list container.
 * @part file-item - An individual file item.
 * @part file-remove - The remove button for a file item.
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

  /** Maximum number of files allowed. */
  @Prop() maxFiles?: number;

  /** Whether to show the file list below the dropzone. */
  @Prop() showFileList = true;

  /** Whether the file upload is disabled. */
  @Prop({ reflect: true }) disabled = false;

  /** Label text for the dropzone. */
  @Prop() label = 'Drop files here or click to upload';

  /** Form field name. */
  @Prop() name?: string;

  /** Emitted when files are selected or dropped. */
  @Event({ eventName: 'tsChange' }) tsChange!: EventEmitter<{ files: File[] }>;

  /** Emitted when a file is removed from the list. */
  @Event({ eventName: 'tsRemove' }) tsRemove!: EventEmitter<{ file: File; files: File[] }>;

  /** Whether a drag operation is over the dropzone. */
  @State() isDragOver = false;

  /** The currently selected files. */
  @State() selectedFiles: File[] = [];

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
        this.storeFiles(files);
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
        this.storeFiles(files);
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

    // Limit by maxFiles
    if (this.maxFiles !== undefined && this.maxFiles > 0) {
      const remaining = this.maxFiles - this.selectedFiles.length;
      if (remaining <= 0) return [];
      validFiles = validFiles.slice(0, remaining);
    }

    return validFiles;
  }

  private storeFiles(files: File[]): void {
    if (this.multiple) {
      this.selectedFiles = [...this.selectedFiles, ...files];
    } else {
      this.selectedFiles = [...files];
    }
    this.tsChange.emit({ files: this.selectedFiles });
  }

  private handleRemoveFile = (index: number): void => {
    const removed = this.selectedFiles[index];
    this.selectedFiles = this.selectedFiles.filter((_, i) => i !== index);
    this.tsRemove.emit({ file: removed, files: this.selectedFiles });
    this.tsChange.emit({ files: this.selectedFiles });
  };

  private formatFileSize(bytes: number): string {
    if (bytes >= 1073741824) {
      return `${(bytes / 1073741824).toFixed(1)} GB`;
    }
    if (bytes >= 1048576) {
      return `${(bytes / 1048576).toFixed(1)} MB`;
    }
    if (bytes >= 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${bytes} B`;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

        {this.maxFiles !== undefined && this.selectedFiles.length >= this.maxFiles && (
          <div class="file-upload__capacity">Maximum {this.maxFiles} files reached</div>
        )}

        {this.showFileList && this.selectedFiles.length > 0 && (
          <div class="file-upload__list" part="file-list">
            {this.selectedFiles.map((file, index) => (
              <div class="file-upload__file" part="file-item" key={file.name + index}>
                <span class="file-upload__file-name">{file.name}</span>
                <span class="file-upload__file-size">{this.formatFileSize(file.size)}</span>
                <button
                  class="file-upload__file-remove"
                  part="file-remove"
                  type="button"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => this.handleRemoveFile(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </Host>
    );
  }
}
