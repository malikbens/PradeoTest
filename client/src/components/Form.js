import React from 'react'

export default function Form() {
    return (
        <div>
            <form action="/api/apps" method='post' encType='multipart/form-data'>
                <div class="form-group">
                    <label for="exampleFormControlFile1">Ajouter une application</label>
                    <input type="file" name="application" class="form-control-file" id="exampleFormControlFile1" />
                    <input type="submit" value="upload" />
                </div>
            </form>
        </div>
    )
}
