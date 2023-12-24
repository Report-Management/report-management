function getExtension(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
}

function isImage(filename) {
    const ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'bmp':
        case 'png':
            return true;
    }
    return false;
}

function isVideo(filename) {
    const ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
        case 'mkv':
        case 'mov':
            return true;
    }
    return false;
}

export function isAllowedFile(file) {
    if (!file) {
        return false;
    }
    const fileType = file.type;

    if (fileType && fileType.startsWith('video/') && isVideo(file.name)) {
        return true;
    } else return !!(fileType && fileType.startsWith('image/') && isImage(file.name));
}


export function isImageOrVideo(file) {
    if (!file) {
        return null;
    }
    const fileType = file.type;
    if (fileType && fileType.startsWith('video/') && isVideo(file.name)) {
        return 'video';
    } else if (fileType && fileType.startsWith('image/') && isImage(file.name)) {
        return 'image';
    }
}